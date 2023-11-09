const URL = process.env.BE_URL;

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
      body: JSON.stringify({
        user_id: userId
      })
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
    return data;
  } catch (e) {
    console.log('this is an catched error',e);
  }
}

//TECH DEBT - need to update dat in DB when logging out
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

//TECH DEBT - FOR NOW UPDATES ALL BUT MATCHES ONLY DISTRICT - NEED DEBUG STORED FUNCTION updatepreferences() in DB
export async function updateProfileMeta (maxPrice, minSize, district, userId) {
  try {
    console.log(district)
    const responce = await fetch(`${URL}/profileMeta`, {
      method: "POST",
      headers: {"Content-Type" : 'application/json'},
      body: JSON.stringify({
        max_price: maxPrice,
        min_size: minSize,
        distr: district,
        user_id: userId
      })
    });
    const data = await responce.text();
    return data;
  } catch (e) {
    console.log(e);
  }
}

//EXPERIMENTAL - see /server/service/getCoordinates.js
export async function getCoordinates (flatId, adr) {
  try {
    const geoURL = 'https://api.geoapify.com/v1/geocode/search?text='
    const apiAdr = 'apiKey=eee1cb95010b46c495452f1642cc866d'
    const responce = await fetch(`${geoURL}${adr}&${apiAdr}`, {
      method: "GET",
      headers: {"Content-Type" : 'application/json'},
    });
    const data = await responce.json();
    return data.features[0].geometry.coordinates;
  } catch (e) {
    console.log(e);
  }
}

//EXPERIMENTAL - see /server/service/getCoordinates.js
export async function pushCoordinates (flatId, userId, latitude, longtitude) {
  try {
    const responce = await fetch(`${URL}/coordinates`, {
      method: "POST",
      headers: {"Content-Type" : 'application/json'},
      body: JSON.stringify({
        flat_id: flatId,
        user_id: userId, 
        latitude: latitude,
        longtitude: longtitude
      })
    });
    
    const data = await responce.text();
    return data;
  } catch (e) {
    console.log(e);
  }
}