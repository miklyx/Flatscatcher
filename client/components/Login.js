import React, {useState} from "react";
import {TextInput, Image, Text, View, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import { updateProfilMetaOnLogin } from "../apiService";

import Top from "./Top";

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
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
        <Text style={styles.logtext}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          onChangeText={(text) => setUsername(text)}
        />
        <Text style={styles.logtext}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="password"
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={{ color: '#FAF2A1', fontWeight: 'bold', fontSize: 16 }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#759AAB',
  },
  titletext: {
    color: 'red',
/*     marginLeft: 50,
 */  },
  logcontainer: {
    fontWeight: "bold",
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop:20

 },
 logtext: {
  fontWeight: "bold",
  color: '#401F3E',
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#401F3E',
    backgroundColor: '#FAF2A1',
    marginBottom: 10,
    padding: 5,
  },
  button: {
    backgroundColor: '#401F3E',
    width: 300,
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 100,
  },
  banner: {
    width: '100%',
    height: 100, 
    resizeMode: 'cover', 
    
  },
});
