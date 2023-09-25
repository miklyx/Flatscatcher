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


export async function getFlats () {
  try {
    const responce = await fetch(URL+'/flats')
    const data = await responce.json();
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