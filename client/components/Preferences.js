import React, { useState } from "react";
import { View,Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar} from "react-native";

import moment from "moment";

export default function Preferences ({ route }) {
  
  const {userId, userData, userStats, userPreferences} = route.params;
  const [updatedUserName, setUpdatedUserName] = useState(userData.first_name);
  const [updatedUserLName, setUpdatedUserLName] = useState(userData.last_name);
  const [updatedUserPhone, setUpdatedUserPhone] = useState(userData.phone);
  const [updatedPreferences, setUpdatedPreferences] = useState([userPreferences]);

  
  const handleUpdateUser = () => {
    //push to db
    alert('updated!');
  }

  const handleUpdatePreferences = () => {
    //push to db
  }
  
  return (
    <View style={styles.container}>
      <View>
        <StatusBar style="auto" />
        <Image
          source={require('../assets/top_banner_light.png')}
          style={styles.banner}
        />
      </View>
      <View style={styles.profile}>
      <Text style={{color:'#FAF2A1',margin: 15, fontSize:20, fontWeight: 'bold'}}>Update profile</Text>
        <TextInput
          style={styles.input}
          placeholder={userData.first_name}
          onChangeText={(text) => setUpdatedUserName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder={userData.last_name}
          onChangeText={(text) => setUpdatedUserLName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder={userData.phone}
          onChangeText={(text) => setUpdatedUserPhone(text)}
        />
        <View style={styles.updateBlock}>
          <TouchableOpacity  onPress={handleUpdateUser}>
            <Text style={styles.updateText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.preferences}>
        <Text> This is last visit {moment(userStats.lastvisit).format('Do of MMMM YYYY, h:mm a')}</Text>
        <TextInput
          style={styles.input}
          placeholder={userPreferences.district}
          onChangeText={(text) => setUpdatedPreferences(text)}
        />
        <TextInput
          style={styles.input}
          placeholder={String(userPreferences.price_max)}
          onChangeText={(text) => setUpdatedPreferences(text)}
        />
        <TextInput
          style={styles.input}
          placeholder={String(userPreferences.size_min)}
          onChangeText={(text) => setUpdatedPreferences(text)}
        />
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: '#759AAB', // 60% #759AAB
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  profile: {
    flex: 1,
    backgroundColor: '#401F3E', // 30% #401F3E
    padding: 10,
    justifyContent: "center",
    alignItems: 'center',
  },
  preferences: {
    flex: 1,
    backgroundColor: '#FAF2A1', // 10% #FAF2A1
    padding: 10,
    justifyContent: "center",
    alignItems: 'center',

  },
  updateBlock: {
    backgroundColor: '#FAF2A1',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    margin: 15,
    width: 150,
  },
  updateText: {
    fontWeight: 'bold',
    fontSize: 20,
   
    color: '#401F3E'
  },
  input: {
    width: 300,
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 5,
  },
  prefBlock: {
    backgroundColor: '#FAF2A1',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    margin: 15,
    width: 150,
  },
  prefText: {
    fontWeight: 'bold',
    fontSize: 20,
   
    color: '#401F3E',
  },
  banner: {
    width: '100%',
    height: 100, 
    resizeMode: 'cover', 
    
  },
});