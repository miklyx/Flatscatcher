import asyncio
import os
from dotenv import load_dotenv

from telethon import TelegramClient, functions, types
from telethon.errors import SessionPasswordNeededError
from database import asyncpg, create_table_messages24, create_table_last24, insert_message, update_last_message_id, get_last_message_id 

load_dotenv()

API_ID = os.environ.get('PY_API_ID')
API_HASH = os.environ.get('PY_API_HASH')
PHONE_NUMBER = os.environ.get('PY_PHONE_NUMBER')
CHANNEL_USERNAME = os.environ.get('PY_CHANNEL_USERNAME')
DATABASE_URL = os.environ.get('PY_DATABASE_URL')

async def main():
    client = TelegramClient('flats', API_ID, API_HASH)
    db_connection = await asyncpg.connect(DATABASE_URL)

    try:
        await client.start()
        await create_table_messages24(db_connection)
        await create_table_last24(db_connection)
        print('Telegram client started')
        last_message_id = await get_last_message_id(db_connection)
        entity = await client.get_entity(CHANNEL_USERNAME)
        
        while True:
            messages = await client.get_messages(entity, limit=50)
            new_messages = [message for message in messages if message.id>last_message_id]
            if new_messages:
                last_message_id = new_messages[0].id
                for message in new_messages:
                    str=message.raw_text
                    about = str.split('Price: ')[0]
                    last = str.split('Price: ')[1]
                    price = last.split('Size: ')[0]
                    last = last.split('Size: ')[1]
                    size = last.split('Location: ')[0]
                    address_full = last.split('Location: ')[1]
                    address = address_full.split('https:')[0]
                    url = 'https:'+address_full.split('https:')[1]
                    print(message.id)
                    await insert_message(
                        db_connection, 
                        message.id,
                        '',
                        url,
                        about,
                        price,
                        size,
                        '',
                        address,
                        'imsc24',
                        '',
                        '',
                        '',
                        '',
                        message.date.strftime("%d/%m/%Y, %H:%M:%S")
                        ) 
                # last_message_id = message.id
                await update_last_message_id(db_connection, last_message_id)
            await asyncio.sleep(300)

    except SessionPasswordNeededError:
        code = input('Please enter the two-factor authentication code from your Telegram app: ')
        await client(functions.auth.CheckPasswordRequest(code=code))
    except Exception as e:
        print(f'Error: {e}')
    finally:
        await client.disconnect()
        await db_connection.close()


if __name__ == '__main__':
    asyncio.run(main())
