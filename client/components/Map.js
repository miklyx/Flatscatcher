import React, {useEffect, useState} from "react";
import { View,Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import { getFlats } from '../apiService'
import { Marker } from "react-native-maps";

export default function Map ({ route }) {
  const {userId, userData} = route.params;
  const [flats, setFlats] = useState([]);
  const [visibleFlats, setVisibleFlats] = useState(30);

 useEffect(() => {
   getFlats().then(res => {
      setFlats(res);
    })
  },[])

  const loadMore = () => {
    setVisibleFlats(prevVisibleFlats => prevVisibleFlats + 30);
  };

  const handleApply = () => {
    alert('Applied!')
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
                latitude: 52.49841,
                longitude: 13.34942,
                },
      title: 'Schoeneberg',
      description: 'Schoeneberg flats'
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
                latitude: 52.49800,
                longitude: 13.40878,
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
  ]

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Text> This a map of flats for {userData.first_name}</Text>
      </View>
      <ScrollView>
      <MapView 
        style={styles.map} 
        initialRegion={{
          latitude: 52.51679,
          longitude: 13.40935,
          latitudeDelta: 0.25,
          longitudeDelta: 0.25,
        }}>
        {markers.map((marker, index) => (
          <Marker
          key={index}
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
    />
  ))}
      </MapView>
      
       {flats.slice(0, visibleFlats).map((flat) => (
        <View key={flat.id} style={styles.flatBlock}>
          <Text>{flat.title}</Text>
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
};

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    backgroundColor: 'rgb(200,200,255)',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatBlock: {
    backgroundColor: 'white', 
    borderWidth: 1, 
    borderColor: 'gray', 
    borderRadius: 5, 
    padding: 10, 
    marginVertical: 5,
  },
  loadMore: {
    fontWeight: 'bold',
  },
  map: {
    width: 400,
    height: 500,
    alignSelf: 'center'
  },
});