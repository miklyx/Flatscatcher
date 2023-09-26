import React, { useEffect, useState } from "react";
import { View,Text, StyleSheet, TouchableOpacity, Image, StatusBar } from "react-native";
import moment from "moment";


import { onLogin, getStats, getPreferences } from '../apiService';

export default function Profile ({ route, navigation}) {
  const [userData, setUserData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userStats, setUserStats] = useState(null);
  const [userPreferences, setUserPreferences] = useState(null);
  const {userId} = route.params;
  
  const handleSearch = () => {
    navigation.navigate('List', { userId, userData });
  };

  const handleMap = () => {
    navigation.navigate('Map', { userId, userData });
  };

  const handlePreferences = () => {
    navigation.navigate('Preferences', { userId, userData, userStats, userPreferences });
  };

  useEffect(() => {
    onLogin(userId).then((data) => {
      setUserData(data);
      setIsLoaded(true);
    });
    
    getStats(userId).then((data) => {
      setUserStats(data);
      //console.log(data);
    });
    getPreferences(userId).then((data) => {
      setUserPreferences(data);
    });
  }, [userId]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        source={require('../assets/top_banner_light.png')}
        style={styles.banner}
      />
      
      {/* {isLoaded && 
      <Text style={styles.title}> {userData.first_name} {userData.last_name}</Text>}
      {isLoaded &&
      <Text style={styles.title}> {userData.email}</Text>} */}
      
      
      <View style={styles.statsContainer}>
        <View style={styles.stats}>
          <TouchableOpacity  style={styles.statBlock} onPress={handlePreferences}>
            <View style={{flex:1, flexDirection:'row',alignItems:'center'}}>
            
            {isLoaded && 
              <Image source={{uri: userData && userData.pic_url}}
                    style={{width: 60, height: 120, marginTop: -20, marginLeft: 0 }} />   
              }
            {/* </TouchableOpacity>
            <TouchableOpacity onPress={handlePreferences}> */}
              <View >
                <Text style={styles.textProfileBlock} >Update</Text>
                <Text style={styles.textProfileBlock}>Profile</Text>
              </View>
            

            </View>
          </TouchableOpacity>
          <View style={styles.statBlock}>
            {userStats && 
              <View>
                <View style={styles.lastvisit}>
                  <Text style={{fontWeight:'bold', marginTop: 2, color: '#7b656d'}}> Last visit:</Text>
                  <Text style={styles.lastvisitdata}>{moment(userStats.lastvisit).format('h:mm a, Do of MMMM YYYY')}</Text>
                  <Text style={{borderStyle:'solid'}}> </Text>
                </View>
                <View style={styles.otherstats}>
                  <Text>
                    <Text style={{fontWeight:'bold', marginTop: 0, color: '#7b656d'}}> Total: </Text>
                    <Text style={{textAlign:'right'}}>{userStats.all}</Text>
                  </Text>
                  <Text>
                    <Text style={{fontWeight:'bold', marginTop: 0, color: '#7b656d'}}> New: </Text><Text>{userStats.new}</Text>
                  </Text>
                  <Text>
                    <Text style={{fontWeight:'bold', marginTop: 0, color: '#7b656d'}}> Appied: </Text><Text>{userStats.applied}</Text>
                  </Text>
                </View>
              </View>}
          </View>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBlock}>
          <TouchableOpacity onPress={handleMap}>
            <Text style={styles.searchText}>Map of your matched flats</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchBlock}>
          <TouchableOpacity onPress={handleSearch}>
            <Text style={styles.searchText}>List of all flats</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    /* paddingVertical: 20, */
    backgroundColor: '#5C4B51',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    /* justifyContent: 'center', */
  },
  title: {
    fontWeight: 'bold',
    color: '#fbf8ea',
    fontSize: 28,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 200, 
    width: 450,
    marginTop: 20,
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',

    width: '100%',
    backgroundColor: '#401F3E',

  },
  statBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 150,
    maxHeight: 150,
    width: 150,
    maxWidth: 150,
    color: '#fbf8ea',
    backgroundColor: '#fbf8ea',
    marginTop: 20,
    borderRadius: 35,
    padding: 15,
    
  },
  search: {
    flex: 1,
    width: 300,
    height: 100,
    backgroundColor: 'rgb(10,200,255)',
    padding: 10,
    justifyContent: "flex-end",
    alignItems: 'center',

  },
  searchContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  searchBlock: {
    backgroundColor: '#401F3E',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    margin: 15,
    width: 350,
  },
  searchText: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fbf8ea'
  },
  banner: {
    width: '100%',
    height: 100, 
    resizeMode: 'cover', 
    
  },
  textProfileBlock: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#7b656d'
  }, 
  lastvisit:{
    alignItems: 'center'
  },
  otherstats: {
    alignItems:'center'
  }
});