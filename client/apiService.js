const URL = 'http://10.0.2.2:3003'

export async function onLogin (userId) {
  try {
    const responce = await fetch(`${URL}/profile?user_id=${userId}`, {
      method: "GET",
      headers: {"Content-Type" : 'application/json'},
    });
    //console.log('fetch alles')
    const data = await responce.json();
    //console.log('fromapiservice'+data.first_name)
    return data;
  } catch (e) {
    console.log(e)
  }
}

export async function getStats (userId) {
  try {
    const responce = await fetch(`${URL}/stats?user_id=${userId}`, {
      method: "GET",
      headers: {"Content-Type" : 'application/json'},
    });
    //console.log('fetch alles')
    const data = await responce.json();
    //console.log('fromapiservice'+data.first_name)
    return data;
  } catch (e) {
    console.log(e)
  }
}

export async function getFlats () {
  try {
    //console.log('try to ger on client apiService')
    const responce = await fetch(URL+'/flats')//, {
      //method: "GET",
      //headers: {"Content-Type" : 'application/json'},
      //body: JSON.stringify({title: event, date: date, venue: venue})
    //});
    //console.log('fetch alles')
    const data = await responce.json();
    return data;
  } catch (e) {
    console.log('this is an catched error',e)
  }
}

export async function onLogout () {
  try {
    console.log('tried')
  } catch (e) {
    console.log(e)
  }
}