import React, { useEffect, useState } from "react";
import { View,Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import moment from "moment";

import { onLogin, getStats } from '../apiService';

export default function Profile ({ route, navigation}) {
  const [userData, setUserData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userStats, setUserStats] = useState(null);
  const {userId} = route.params;
  
  const handleSearch = () => {
    navigation.navigate('List', { userId, userData });
  };

  const handleMap = () => {
    navigation.navigate('Map', { userId, userData });
  };

  const handlePreferences = () => {
    navigation.navigate('Preferences', { userId, userData, userStats });
  };

  useEffect(() => {
    onLogin(userId).then((data) => {
      setUserData(data);
      setIsLoaded(true);
    });
    getStats(userId).then((data) => {
      setUserStats(data);
    });
  }, [userId]);

  return (
    <View style={styles.container}>
      {isLoaded && <Text style={styles.title}> This is profile of {userData.first_name} {userData.last_name}</Text>}
      <View style={styles.stats}>
        <View style={styles.statBlock}>
          <TouchableOpacity onPress={handlePreferences}>
          {isLoaded && 
            <Image source={{uri: userData && userData.pic_url}}
                  style={{width: 60, height: 120}} />
                  }
          </TouchableOpacity>
        </View>
        <View style={styles.statBlock}>
          {userStats && <Text style={{fontWeight:'bold', marginTop: 20}}> Last visit: {moment(userStats.lastvisit).format('h:mm a, Do of MMMM YYYY')}</Text>}
        </View>
      </View>
      <View style={styles.search}>
        <Text> This is a map for {userId} user</Text>
        <TouchableOpacity onPress={handleMap}>
          <Text>Touch this and see map</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.search}>
        <Text> This is a search for {userId} user</Text>
        <TouchableOpacity onPress={handleSearch}>
          <Text>Touch this and see list</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    backgroundColor: 'rgb(200,200,255)',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginTop: 25,
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: 30,
    
    width: 450,
    
    backgroundColor: 'rgb(200,200,200)',

  },
  statBlock: {
    height: 150,
    width: 150,
    backgroundColor: 'rgb(200,100,255)',
    marginTop: 50,
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

  }
});