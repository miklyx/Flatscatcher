import React, {useEffect, useState} from "react";
import { View,Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import MapView from "react-native-maps";
import { getFlats, applyTo } from '../apiService';
import { Marker } from "react-native-maps";

export default function Map ({ route }) {
  const {userData} = route.params;
  const [flats, setFlats] = useState([]);
  const [applied, setApplied] = useState(false);
  const [visibleFlats, setVisibleFlats] = useState(15);
  const [selectedFlat, setSelectedFlat] = useState(null);


 useEffect(() => {
   getFlats().then(res => {
      setFlats(res);
    })
  },[])

  const loadMore = () => {
    setVisibleFlats(prevVisibleFlats => prevVisibleFlats + 10);
  };

  const handleMarkerPress = (flat) => {
    if (!selectedFlat) setSelectedFlat(flat)
    else setSelectedFlat(null);
  };

  const handleApply = (flat) => {
    applyTo(flat.id, userData.id).then(res => {
      const updatedFlats = flats.map((item) => {
        if (item.id === flat.id) {
          return { ...item, applied: true };
        }
        return item;
      });
      setFlats(updatedFlats);
  
      console.log(res);
    }) 
    .catch((error) => {
      console.error("Error applying:", error);
    });
    Linking.openURL('https://www.immobilienscout24.de/')// TECH DEBT - RESURRECT NEW FLATS FLOW flat.url)
        .then(() => {
            alert('Applied and opened the link!');
          })
        .catch((error) => {
        console.error('Error opening the link:', error);
          alert('Applied, but there was an error opening the link.');
    });
    
  };

  const filteredFlats = flats.filter(flat => flat.preferred === 1 && flat.longitude && flat.latitude)
  filteredFlats.slice(0, 5)

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        initialRegion={{
          /*TECH DEBT - take central coordinated of district or first flat in list or whatever  */
          latitude: 52.498570832573186, 
          longitude: 13.406639494389717,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        {filteredFlats.slice(0, visibleFlats).map((flat, index) => (
          <Marker
          key={index}
          //TECH DEBT - SWITCH COORDINATED IN DATABASE
          coordinate={{latitude: parseFloat(flat.longitude), longitude: parseFloat(flat.latitude)}}
          title={flat.title}
          description={'Price: '+flat.price+', Address: '+flat.fulladr}
          onPress={() => handleMarkerPress(flat)}
          />
          ))}
      </MapView>
      
      {visibleFlats < flats.length && (
        <TouchableOpacity style={styles.loadMoreButton} onPress={loadMore}>
          <Text style={styles.loadMoreText}>Load more flats by your taste...</Text>
        </TouchableOpacity>
        )} 

      {selectedFlat && (
        <View style={styles.preferredFlat}>
          <Text style={{color:"#401F3E", fontStyle: 'italic', marginBottom:10}}>{selectedFlat.title}</Text>
          <Text>{selectedFlat.price} €</Text>
          <Text>{selectedFlat.size} m2</Text>
          <Text>{selectedFlat.address}</Text>
      
          {!selectedFlat.applied ? (
            <TouchableOpacity style={styles.loadMoreButton} onPress={() => handleApply(selectedFlat)}>
            <Text style={{fontWeight:'bold', color: '#401F3E', textAlign: 'right'}}>Apply to flat</Text>
            </TouchableOpacity>
            ) : (
            <Text style={{fontWeight:'light', color: '#401F3E', textAlign: 'right'}}>Applied</Text>
            )
          } 
      </View>
      )}
    </View>
  )}
      



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5C4B51',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 0,
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
  preferredFlat: {
    backgroundColor: '#d9e9e5', 
    color: '#401F3E',
    borderWidth: 5, 
    borderColor: '#401F3E', 
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
    width: '100%',
    height: 100, 
    resizeMode: 'cover',
  },
  loadMoreButton: {
    fontWeight: 'bold',

  },
  loadMoreText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#d9e9e5',
    marginTop: 10,
    marginBottom: 30,
  },
});