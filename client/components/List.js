import React, {useEffect, useState} from "react";
import { View,Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { getFlats } from '../apiService';

export default function List ({ route }) {
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
    alert('Applied!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Text> This a list of flats for {userId} user</Text>
      </View>
      <ScrollView>
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
    justifyContent: 'center'
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
  }
});