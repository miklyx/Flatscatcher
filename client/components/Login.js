import React, {useState} from "react";
import {TextInput, Image, Text, View, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import { updateProfilMetaOnLogin } from "../apiService";

import Top from "./Top";

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');

  //TECH DEBT - authorization
  const [password, setPassword] = useState('');

  const handleLogin = () => {

      //TECH DEBT - authorization

    const email = username;
    const userId=1;
    updateProfilMetaOnLogin(userId).then((data) => {
      console.log(data)
    })

    navigation.navigate('Profile', { userId, email });
  };


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        
       
          <Image
            source={require('../assets/top_banner_light.png')}
            style={styles.banner}
          />
          <Top />
          <View style={styles.logcontainer}>
            <Text style={styles.titletext}></Text>
            <TextInput
              style={styles.input}
              placeholder="absolutely@homeless.de"
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="*********"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={{ color: '#fbf8ea', fontWeight: 'bold', fontSize: 16 }}>Login</Text>
            </TouchableOpacity>
          </View>
      
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#5C4B51',
  },
  titletext: {
    color: 'red',
  },
  logcontainer: {
    fontWeight: "bold",
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop:20

 },
 logtext: {
  fontWeight: "bold",
  color: '#fbf8ea',
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#d9e9e5',
    marginBottom: 10,
    padding: 5,
  },
  button: {
    backgroundColor: '#401F3E',
    width: 300,
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginTop: 40,
  },
  banner: {
    width: '100%',
    height: 100, 
    resizeMode: 'cover', 
    
  },
});
