import React, { useEffect, useState } from "react";
import { View,Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import moment from "moment";

import { onLogin, getStats } from '../apiService'

export default function Profile ({ route, navigation}) {
  const [userData, setUserData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userStats, setUserStats] = useState(null);
  const {userId} = route.params;
  const handleSearch = () => {
    navigation.navigate('List', { userId });
  };
  const handlePreferences = () => {
    navigation.navigate('Preferences', { userId, userData, userStats })
  }

  useEffect(() => {
    onLogin(userId).then((data) => {
      setUserData(data) 
      setIsLoaded(true)
    });
    getStats(userId).then((data) => {
      setUserStats(data) 
      //setIsLoaded(true)
    });
  }, [userId]);
  if (userStats) console.log(userStats) ;

  return (
    <View style={styles.container}>
      {isLoaded && <Text> This is profile of {userData.first_name} {userData.last_name}</Text>}
      <View style={styles.stats}>
        <View style={styles.statBlock}>
          <TouchableOpacity onPress={handlePreferences}>
          {isLoaded && 
            <Image source={{uri: userData && userData.pic_url}}
                  style={{width: 50, height: 100}} />
                  }
          </TouchableOpacity>
        </View>
        <View style={styles.statBlock}>
          {userStats && <Text> Last visit was {moment(userStats.lastvisit).format('Do of MMMM YYYY, h:mm a')}</Text>}
        </View>
      </View>
      <View style={styles.search}>
        <Text> This is a map for {userId} user</Text>
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
    justifyContent: 'center'
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: 30,
    
    backgroundColor: 'rgb(200,200,200)',

  },
  statBlock: {
    height: 100,
    width: 100,
    backgroundColor: 'rgb(200,100,255)',
    marginTop: 30,

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