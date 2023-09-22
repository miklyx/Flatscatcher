import React, {Component, useState} from "react";
import {TextInput, Button, Text, View, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';

import { onLogin } from "../apiService";

import Top from "./Top";

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [userData, setUserData] = useState(null)

  const handleLogin = () => {
    
    const email = username
    const userId=1

    /* onLogin(1).then((data) => {
      setUserData(data)
    }); */
    //console.log('fromlogin'+userData.first_name)
    //alert(`Logged in as ${username}`);
    navigation.navigate('Profile', { userId, email });
  };


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Top />
      <View style={styles.logcontainer}>
        <Text style={styles.titletext}>this is login component</Text>
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
        <Button style={styles.button} title="Login" onPress={handleLogin} />
        <TouchableOpacity onPress={handleLogin}>
          <Text>Touch this and log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(255,255,255)',
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
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: 'gray',

    marginBottom: 10,
    padding: 5,
  },
  button: {
    color: '#ffffff',
    width: 800,
    alignSelf: 'center'
  }
});
