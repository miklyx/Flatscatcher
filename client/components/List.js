import React, {useEffect, useState} from "react";
import { View,Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from "react-native";
import { getFlats, applyTo } from '../apiService';

export default function List ({ route }) {
  const {userData} = route.params;
  const [flats, setFlats] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleFlats, setVisibleFlats] = useState(30);
  const [applied, setApplied] = useState(false);
  const [showSearchBlock, setShowSearchBlock] = useState(false);
  const [showSortBlock, setShowSortBlock] = useState(false);
  const [sortOrder, setSortOrder] = useState('');
  const [searchDistrict, setSearchDistrict] = useState(''); 
  const [searchPrice, setSearchPrice] = useState(0); 
  const [searchArea, setSearchArea] = useState(0); 
  const [searchPreferred, setSearchPreferred] = useState('');

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

  const handleApply = (flat) => {
    console.log(flat)
    console.log(userData.id)
    applyTo(flat.id, userData.id).then(res => {
      const updatedFlats = flats.map((item) => {
        if (item.id === flat.id) {
          console.log(item)
          return { ...item, applied: true };
        }
        //console.log(item)
        return item;
      });
      //console.log(updatedFlats);
      setFlats(updatedFlats);
  
      console.log(res);
    }) 
    .catch((error) => {
      console.error("Error applying:", error);
    });
    
  };

  const handleSearch = () => {
    setShowSearchBlock(!showSearchBlock);
    
  };

  const handleSort = () => {
    setShowSortBlock(!showSortBlock);
    
  };

  const filteredFlats = flats.filter(flat => {
    const districtMatch = searchDistrict === '' || flat.address.toLowerCase().includes(searchDistrict.toLowerCase());
    const priceMatch = searchPrice === '' || String(flat.price).includes(searchPrice);
    const areaMatch = searchArea === '' || String(flat.size).includes(searchArea);//<= String(flat.size) && String(flat.size) <= searchArea;
    const preferredMatch = searchPreferred === "" || String(flat.preferred) === searchPreferred;

    return (districtMatch || priceMatch || areaMatch) && preferredMatch;
  });

  const sortedFlats = (flats) => {
    if (!sortOrder) return flats;
    if (sortOrder === "ascending") {
      return flats.sort((a, b) => a.price - b.price);
    } else {
      return flats.sort((a, b) => b.price - a.price);
    }

  } 


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
        <TouchableOpacity onPress={handleSort}>
          <Text style={styles.headerButton}>Sort</Text>
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
            placeholder="Max Price"
            value={searchPrice}
            onChangeText={text => setSearchPrice(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Min Area"
            value={searchArea}
            onChangeText={text => setSearchArea(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Preferred (0 or 1)"
            value={searchPreferred}
            onChangeText={(text) => setSearchPreferred(text)}
          />
        </View>
      )}

      {showSortBlock && (
        <View style={styles.searchBlock}>
          <Text style={styles.sortLabel}>Sort:</Text>
          <TouchableOpacity
            onPress={() => setSortOrder("ascending")}
            style={[
              styles.sortButton,
              sortOrder === "ascending" ? styles.activeSortButton : null,
          ]}
        >
          <Text style={styles.sortButtonText}>Ascending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSortOrder("descending")}
          style={[
            styles.sortButton,
            sortOrder === "descending" ? styles.activeSortButton : null,
          ]}
        >
          <Text style={styles.sortButtonText}>Descending</Text>
        </TouchableOpacity>
      </View>
      )}
      
      <ScrollView>
       {filteredFlats && sortedFlats(filteredFlats).slice(0, visibleFlats).map((flat) => (
        <View key={flat.id} style={[styles.flatBlock, flat.preferred === 1 ? styles.preferredFlat : null]}>
          <Text>{flat.title}</Text>
          <Text>{flat.price}</Text>
          <Text>{flat.size}</Text>
          <Text>{flat.address}</Text>
          {!flat.applied ? (
          <TouchableOpacity style={styles.loadMoreButton} onPress={() => handleApply(flat)}>
            <Text>Apply?</Text>
          </TouchableOpacity>) : (
          <Text style={{ color: 'gray' }}>Applied</Text>
          )
          }
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
  preferredFlat: {
    backgroundColor: '#FAF2A1', 
    color: '#401F3E',
    borderWidth: 1, 
    borderColor: 'red', 
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