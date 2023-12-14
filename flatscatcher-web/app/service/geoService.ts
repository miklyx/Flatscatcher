'use client'

const dotenv = require('dotenv');

type address = {
  id: string;
  detail: string;
  latitude?: number | null;
  longitude?: number | null;
};

dotenv.config({path:'../../.env'})


export const addressAutocomplete = async (address :string) : Promise<any[]> => {
  const url = process.env.GEOURL
  const apiKey=process.env.GEOAPI
  const response = await fetch(`${url}${address}&apiKey=${apiKey}`)
  const body:any = await response.json()
  
  const addressList: any[] = body.features.map((adr: any) => {
    return adr
  });
  
  return addressList
}

export const getFlats = async () : Promise<any[]> => {
  try {
    const res = await fetch('http://0.0.0.0:3003/flatsSorted')
    const data = await res.json()
    return data
  } 
  catch(e) {
    console.log(e)
  }
  return []
}
