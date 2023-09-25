/* import { NetworkInfo } from 'react-native-network-info'

NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
  console.log(defaultGateway);
}); */
//console.log(defaultGW)

//const URL=`${defaultGateWay}:3003`

const URL = 'http://10.0.2.2:3003'//'http://192.168.178.1:3003'//'http://10.0.2.2:3003'  //this is an address of gateway of virtual device network

export async function onLogin (userId) {
  try {
    const responce = await fetch(`${URL}/profile?user_id=${userId}`, {
      method: "GET",
      headers: {"Content-Type" : 'application/json'},
    });
    const data = await responce.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getStats (userId) {
  try {
    const responce = await fetch(`${URL}/stats?user_id=${userId}`, {
      method: "GET",
      headers: {"Content-Type" : 'application/json'},
    });
    const data = await responce.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getPreferences (userId) {
  try {
    const responce = await fetch(`${URL}/profileMeta?user_id=${userId}`, {
      method: "GET",
      headers: {"Content-Type" : 'application/json'},
    });
    const data = await responce.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function updateProfilMetaOnLogin (userId) {
  try {
    const responce = await fetch(`${URL}/login`, {
      method: "POST",
      headers: {"Content-Type" : 'application/json'},
      body: {
        user_id: userId
      }
    });
    const data = await responce.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function applyTo (flatId, userId) {
  try {
    const responce = await fetch(`${URL}/apply`, {
      method: "POST",
      headers: {"Content-Type" : 'application/json'},
      body: JSON.stringify({
        flat_id: flatId,
        user_id: userId
      })
    });
    
    const data = await responce.text();
    return data;
  } catch (e) {
    console.log(e);
  }
}


export async function getFlats () {
  try {
    const responce = await fetch(URL+'/flats')
    const data = await responce.json();
    //console.log(data)
    return data;
  } catch (e) {
    console.log('this is an catched error',e);
  }
}

export async function onLogout () {
  try {
    console.log('logged out');
  } catch (e) {
    console.log(e);
  }
}

export async function updateProfile (firstName, lastName, phone, userId) {
  try {
    const responce = await fetch(`${URL}/profile`, {
      method: "POST",
      headers: {"Content-Type" : 'application/json'},
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        user_id: userId
      })
    });
    
    const data = await responce.text();
    return data;
  } catch (e) {
    console.log(e);
  }
}