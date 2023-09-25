import React, {useEffect, useState} from "react";
import { View,Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from "react-native";
import { getFlats } from '../apiService';

export default function List ({ route }) {
  const {userData} = route.params;
  const [flats, setFlats] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleFlats, setVisibleFlats] = useState(30);
  const [showSearchBlock, setShowSearchBlock] = useState(false);
  const [searchDistrict, setSearchDistrict] = useState(''); 
  const [searchPrice, setSearchPrice] = useState(0); 
  const [searchArea, setSearchArea] = useState(0); 

 useEffect(() => {
   getFlats().then(res => {
    //console.log(res)
      setFlats(res);
      setIsLoaded(true);

    })
  },[])

  const loadMore = () => {
    setVisibleFlats(prevVisibleFlats => prevVisibleFlats + 30);
  };

  const handleApply = () => {
    alert('Applied!');
  };

  const handleSearch = () => {
    setShowSearchBlock(!showSearchBlock);
    
  };

  const filteredFlats = flats.filter(flat => {
    const districtMatch = searchDistrict === '' || flat.address.toLowerCase().includes(searchDistrict.toLowerCase());
    const priceMatch = searchPrice === '' || String(flat.price).includes(searchPrice);
    const areaMatch = searchArea <= String(flat.size) && String(flat.size) <= searchArea;

    return districtMatch || priceMatch || areaMatch;
  });


  //Tech debt------
/*   function getMaxPrice() {
    const maxPrice = Math.max(...flats.map(flat => flat.price));
    return maxPrice;
  }

  function getMaxArea() {
    const maxArea = Math.max(...flats.map(flat => flat.size));
    return maxArea;
  } */
  //Tech debt------

  return (
    <View style={styles.container}>
      <View>
        <Image
        source={require('../assets/logo_dark.png')}
        style={styles.banner}
        />
        {isLoaded &&
        <Text style={styles.profile}> This a list of flats for {userData.first_name} {userData.last_name}</Text>}
      </View>

      <View style={styles.headerButtons}>
        <TouchableOpacity onPress={handleSearch}>
          <Text style={styles.headerButton}>Search</Text>
        </TouchableOpacity>
      </View>

      {showSearchBlock && (
        <View style={styles.searchBlock}>
          <TextInput
            style={styles.input}
            placeholder="District"
            value={searchDistrict}
            onChangeText={text => setSearchDistrict(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={searchPrice}
            onChangeText={text => setSearchPrice(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Area"
            value={searchArea}
            onChangeText={text => setSearchArea(text)}
          />
        </View>
      )}
      
      <ScrollView>
       {filteredFlats && filteredFlats.slice(0, visibleFlats).map((flat) => (
        <View key={flat.id} style={styles.flatBlock}>
          <Text>{flat.title}</Text>
          <Text>{flat.price}</Text>
          <Text>{flat.size}</Text>
          <Text>{flat.address}</Text>

          <TouchableOpacity style={styles.loadMoreButton} onPress={handleApply}>
            <Text>Apply?</Text>
          </TouchableOpacity>
        </View>
      
      ))} 
      {visibleFlats < filteredFlats.length && (
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
  profile: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 15,
    width: 230,
    color: '#401F3E',
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
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    color: 'white',
    marginRight: 10,
    fontWeight: 'bold',
  },
  searchBlock: {
    backgroundColor: 'white',
    padding: 10,
    margin: 15,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  banner: {
    width: 50,
    marginTop: 30,
    marginLeft: 30,
    height: 50, 
    resizeMode: 'cover', 
    
  },
});