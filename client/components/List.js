import React, {useEffect, useState} from "react";
import { View,Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Linking } from "react-native";
import { getFlats, applyTo } from '../apiService';

export default function List ({ route }) {
  const {userData} = route.params;
  const [flats, setFlats] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleFlats, setVisibleFlats] = useState(30);
  const [applied, setApplied] = useState(false);
  const [showSearchBlock, setShowSearchBlock] = useState(false);
  const [showSortBlock, setShowSortBlock] = useState(false);
  const [sortOrder, setSortOrder] = useState('default');
  const [searchDistrict, setSearchDistrict] = useState(''); 
  const [searchPrice, setSearchPrice] = useState(''); 
  const [searchArea, setSearchArea] = useState(''); 
  const [searchPreferred, setSearchPreferred] = useState(false);

 useEffect(() => {
   getFlats().then(res => {
      setFlats(res);
      setIsLoaded(true);

    })
  },[])

  const loadMore = () => {
    setVisibleFlats(prevVisibleFlats => prevVisibleFlats + 30);
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
            console.log('Applied and opened the link!');
          })
        .catch((error) => {
        console.error('Error opening the link:', error);
        console.log('Applied, but there was an error opening the link.');
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
    const preferredMatch = !searchPreferred || flat.preferred;

    return (districtMatch || priceMatch || areaMatch) && preferredMatch;
  });

  const sortedFlats = (flats) => {
    if (sortOrder === "default") return flats;
    if (sortOrder === "ascending") {
      return flats.sort((a, b) => a.price - b.price);
    } else {
      return flats.sort((a, b) => b.price - a.price);
    }

  } 


  //Tech debt - sorting and filtering by numeric values of price and size ------
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
        source={require('../assets/top_banner_light.png')}
        style={styles.banner}
        />
        {/* {isLoaded &&
        <Text style={styles.profile}> This a list of flats for {userData.first_name} {userData.last_name}</Text>} */}
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
            placeholder="Enter beloved district"
            value={searchDistrict}
            onChangeText={text => setSearchDistrict(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Your maximum Price"
            value={String(searchPrice)}
            onChangeText={text => setSearchPrice(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Your minimum size of apartment"
            value={String(searchArea)}
            onChangeText={text => setSearchArea(text)}
          />

          <View style={styles.checkboxContainer}>
            {!searchPreferred ? (
              <TouchableOpacity onPress={val => setSearchPreferred(!searchPreferred)}>
                <Text style={styles.checkboxLabel}>Show Preferred only</Text>
              </TouchableOpacity>) : (
                <TouchableOpacity onPress={val => setSearchPreferred(!searchPreferred)}>
                <Text style={styles.checkboxLabel}>Show All</Text>
              </TouchableOpacity>
              )}
          </View>
        </View>
      )}

      {showSortBlock && (
        <View style={styles.searchBlock}>
          <Text style={styles.sortLabel}>Sort by price:</Text>
          <View style={styles.sortBlock}>
              {sortOrder !== "ascending" ? (
                <TouchableOpacity onPress={() => setSortOrder("ascending")} style={styles.sortBlock}>
                  <View style={styles.circleInit}></View>
                  <Text style={styles.sortButtonText}>  Ascending</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setSortOrder("ascending")} style={styles.sortBlock}>
                  <View style={styles.circleActive}></View>
                  <Text style={styles.activeSortButtonText}>  Ascending</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.sortBlock}>
              {sortOrder !== "descending" ? (
                <TouchableOpacity onPress={() => setSortOrder("descending")} style={styles.sortBlock}>
                  <View style={styles.circleInit}></View>
                  <Text style={styles.sortButtonText}>  Descending</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setSortOrder("descending")} style={styles.sortBlock}>
                  <View style={styles.circleActive}></View>
                  <Text style={styles.activeSortButtonText}>  Descending</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.sortBlock}>
              {sortOrder !== "default" ? (
                <TouchableOpacity onPress={() => setSortOrder("default")} style={styles.sortBlock}>
                  <View style={styles.circleInit}></View>
                  <Text style={styles.sortButtonText}>  Default</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setSortOrder("default")} style={styles.sortBlock}>
                  <View style={styles.circleActive}></View>
                  <Text style={styles.activeSortButtonText}>  Default</Text>
                </TouchableOpacity>
              )}
            </View>

          {/* ------------REMOVE---------------------
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
        <TouchableOpacity
          onPress={() => setSortOrder("default")}
          style={[
            styles.sortButton,
            sortOrder === "default" ? styles.activeSortButton : null,
          ]}
        >
          <Text style={styles.sortButtonText}>Default</Text>
        </TouchableOpacity>
        */}
      </View>
      )}
      {/*<DistrictList options={options}/>*/}
      <ScrollView>
       {filteredFlats && sortedFlats(filteredFlats).slice(0, visibleFlats).map((flat) => (
        <View key={flat.id} style={[styles.flatBlock, flat.preferred === 1 ? styles.preferredFlat : null]}>
          <Text style={{color:"#401F3E", fontStyle: 'italic', marginBottom:10}}>{flat.title}</Text>
          <Text>{flat.price} €</Text>
          <Text>{flat.size} m2</Text>
          <Text>{flat.address}</Text>
        
          {!flat.applied ? (
        
          <TouchableOpacity style={styles.loadMoreButton} onPress={() => handleApply(flat)}>
            <Text style={{fontWeight:'bold', color: '#401F3E', textAlign: 'right'}}>Apply to flat</Text>
          </TouchableOpacity>) : (
          <Text style={{fontWeight:'light', color: '#401F3E', textAlign: 'right'}}>Applied</Text>
          )
          }
        </View>
      
      ))} 
      {visibleFlats < filteredFlats.length && (
        <TouchableOpacity style={styles.loadMoreButton} onPress={loadMore}>
          <Text style={styles.loadMoreText}>Load more..</Text>
        </TouchableOpacity>
      )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5C4B51',
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
  flatBlockWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  flatBlock: {
    backgroundColor: '#d9e9e5', 
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
  headerButtons: {
    
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  headerButton: {
    color: '#401F3E',
    textAlign: 'center',
    backgroundColor:'#d9e9e5', 
    borderRadius: 2,
    width: 80,
    height: 22,
    borderStyle:'solid',
    
    margin:10,
    fontWeight: 'bold',
  },
  searchBlock: {
    backgroundColor: '#fbf8ea',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#d9e9e5',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  banner: {
    width: '100%',
    height: 100, 
    resizeMode: 'cover',
  },
  checkboxContainer: {
    backgroundColor: '#401F3E',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    margin: 0,
    width: 250,
  },
  checkboxLabel: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 0,
    color: '#fbf8ea'
  },
  sortButton: {
    color: 'blue',
  },
  activeSortButton: {
    color: 'red',
  },
  sortButtonText: {
    color: '#401F3E',
  },
  activeSortButtonText: {
    fontWeight: 'bold',
    color: '#401F3E',
  }, 
  circleInit: {
    backgroundColor: 'gray',
    borderRadius: 50,
    height:17,
    width:17,
  },
  circleActive: {
    borderRadius: 50,
    backgroundColor: '#401F3E',
    height:17,
    width:17,
  },
  sortBlock: {
    display: 'flex',
    flexDirection: 'row',
  }
});