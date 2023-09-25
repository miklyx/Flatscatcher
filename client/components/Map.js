import React, {useEffect, useState} from "react";
import { View,Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import MapView from "react-native-maps";
import { getFlats, getCoordinates, pushCoordinates } from '../apiService';
import { Marker } from "react-native-maps";

export default function Map ({ route }) {
  const {userData} = route.params;
  const [flats, setFlats] = useState([]);
  const [visibleFlats, setVisibleFlats] = useState(30);

 useEffect(() => {
   getFlats().then(res => {
      setFlats(res);
    })
    //flat.fulladr
  },[])

  const loadMore = () => {
    setVisibleFlats(prevVisibleFlats => prevVisibleFlats + 30);
  };

  const handleApply = () => {
    alert('Applied!');
  };

  const markers = [
    {
      latlng: {latitude: 52.54636,
              longitude: 13.35907,
              },
      title: 'Wedding',
      description: 'Wedding flats'
    },
    {
      latlng:  {
                latitude: 52.5194683,
                longitude: 13.4637863,
                },
      title: 'Dollziger Strasse for test',
      description: 'Dollziger flats'
    },
    {
      latlng:  {
                latitude: 52.53869,
                longitude: 13.42427,
                },
      title: 'Prenzlauer Berg',
      description: 'Prenzlauer Berg flats'
    },
    {
      latlng:  {
                latitude: 13.4637863,
                longitude: 13.4637863,
                },
      title: 'Kreuzberg',
      description: 'Keruzberg flats'
    },
    {
      latlng:  {
                latitude: 52.51594,
                longitude: 13.45372,
                },
      title: 'Friedrichshain',
      description: 'Friedrichshain flats'
    },
    {
      latlng:  {
                latitude: 52.53753,
                longitude: 13.36202,
                },
      title: 'Mitte',
      description: 'Mitte flats'
    },
  ];
  const filteredFlats = flats.filter(flat => flat.preferred === 1 && flat.longitude && flat.latitude)
  filteredFlats.slice(0, 15)
  //----TECH DEBT -- too much data everuthing f*s up
  /* filteredFlats.slice(0, 15).map(flat => {
    if (!flat.latitude) {
      //---------try?---------
      try {

        getCoordinates(flat.id, flat.fulladr).then(res => {
          if (Array.isArray(res)) {const [longitude, latitude] = res}
          pushCoordinates(flat.id, userData.id, latitude, longitude)
          setFlats((prevFlats) => {
            const updatedFlats = prevFlats.map((item) => {
              if (item.id === flat.id) {
                return {
                  ...item,
                  latitude: latitude,
                  longitude: longitude,
                };
              }
              return item;
            });
            return updatedFlats;
          });
            
          //pushCoordinates(flat.id, userData.id, latitude, longitude)
        })
        //---- end try ------
    } catch (e) {
      console.log.log(e)
    }
  }
}) */

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
        source={require('../assets/logo_dark.png')}
        style={styles.banner}
        />
         <Text> This a map of flats for {userData.first_name}</Text>
       </View>
      <ScrollView>
      <MapView 
        style={styles.map} 
        initialRegion={{
          latitude: 52.51679,
          longitude: 13.40935,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        {filteredFlats.map((flat, index) => (
          <Marker
          key={index}
          //TECH DEBT - SWITCH COORDINATED IN DATABASE
          coordinate={{latitude: parseFloat(flat.longitude), longitude: parseFloat(flat.latitude)}}
          title={flat.title}
          description={flat.price}
    />
  ))}
      </MapView>
      
       {filteredFlats.slice(0, visibleFlats).map((flat) => (
        <View key={flat.id} style={styles.flatBlock}>
          <Text>{flat.title}</Text>
          <Text>{String(flat.price)}</Text>
          <Text>{String(flat.size)}</Text>
          <Text>{flat.address}</Text>
          <Text>{flat.fulladr}</Text>
          <Text>{flat.latitude}</Text>
          <Text>{flat.longitude}</Text>
          <TouchableOpacity style={styles.loadMoreButton} onPress={handleApply}>
            <Text>Apply?</Text>
          </TouchableOpacity>
        </View>
      
      ))} 
      {visibleFlats < flats.length && (
        <TouchableOpacity style={styles.loadMoreButton} onPress={loadMore}>
          <Text style={styles.loadMoreText}>More..</Text>
        </TouchableOpacity>
      )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#759AAB',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  flatBlock: {
    backgroundColor: '#FAF2A1', 
    color: '#401F3E',
    borderWidth: 1, 
    borderColor: 'gray', 
    borderRadius: 5, 
    padding: 10, 
    marginVertical: 10,
    marginHorizontal: 15,
  },
  loadMore: {
    fontWeight: 'bold',
  },
  map: {
    width: 400,
    height: 500,
    alignSelf: 'center'
  },
  banner: {
    width: 50,
    marginTop: 30,
    marginLeft: 30,
    height: 50, 
    resizeMode: 'cover', 
    
  },
});