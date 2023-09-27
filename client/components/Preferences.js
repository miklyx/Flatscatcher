import React, { useState } from "react";
import { View,Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, ScrollView, KeyboardAvoidingView} from "react-native";
import { updateProfile, updateProfileMeta } from "../apiService";

export default function Preferences ({ route }) {
  
  const {userId, userData, userStats, userPreferences} = route.params;
  const [updatedUserName, setUpdatedUserName] = useState(userData.first_name);
  const [updatedUserLName, setUpdatedUserLName] = useState(userData.last_name);
  const [updatedUserPhone, setUpdatedUserPhone] = useState(userData.phone);
  const [updatedMaxPrice, setUpdatedMaxPrice] = useState(userPreferences.price_max);
  const [updatedMinSize, setUpdatedMinSize] = useState(userPreferences.size_min);
  const [updatedDistrict, setUpdatedDistrict] = useState(userPreferences.district);



  
  const handleUpdateUser = () => {
    updateProfile(updatedUserName, updatedUserLName, updatedUserPhone, userData.id)
    updateProfileMeta(updatedMaxPrice, updatedMinSize, updatedDistrict, userData.id)
  }
  
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled" 
    >
    <KeyboardAvoidingView
      behavior={"padding"}//Platform.OS === "ios" ? "padding" : "height"} - needs to be tested 
      style={{ flex: 1 }}
    >
        <View style={styles.container}>
          <View>
            <StatusBar style="auto" />
            <Image
              source={require('../assets/top_banner_light.png')}
              style={styles.banner}
            />
          </View>
          <View style={styles.profile}>
            <Text style={{color:'#fbf8ea',margin: 15, fontSize:20, fontWeight: 'bold'}}>Edit profile</Text>
            <TextInput
              style={styles.input}
              value={updatedUserName}
              onChangeText={(text) => setUpdatedUserName(text)}
            />
            <TextInput
              style={styles.input}
              value={updatedUserLName}
              onChangeText={(text) => setUpdatedUserLName(text)}
            />
            <TextInput
              style={styles.input}
              value={updatedUserPhone}
              onChangeText={(text) => setUpdatedUserPhone(text)}
            />
            <View style={styles.updateBlock}>
              <TouchableOpacity  onPress={handleUpdateUser}>
                <Text style={styles.updateText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.preferences}>
            <Text style={{color:'#fbf8ea',margin: 15, fontSize:20, fontWeight: 'bold'}}>Edit flat preferences</Text>
            <TextInput
              style={styles.input}
              value={updatedDistrict}
              onChangeText={(text) => setUpdatedDistrict(text)}
            />
            <TextInput
              style={styles.input}
              value={String(updatedMaxPrice)}
              onChangeText={(text) => setUpdatedMaxPrice(text)}
            />
            <TextInput
              style={styles.input}
              value={String(updatedMinSize)}
              onChangeText={(text) => setUpdatedMinSize(text)}
            />
            
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: '#759AAB', 
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  profile: {
    flex: 1,
    backgroundColor: '#401F3E', 
    padding: 0,
    justifyContent: "flex-start",
    alignItems: 'center',
    height: 200,
  },
  preferences: {
    flex: 1,
    backgroundColor: '#5C4B51', 
    padding: 0,
    justifyContent: "flex-start",
    alignItems: 'center',
    height: 200,
  },
  updateBlock: {
    backgroundColor: '#fbf8ea',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    margin: 15,
    marginTop: 30,
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