import React, {Component} from "react";
import {Text, View, StyleSheet} from 'react-native';

export default function Top() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FLATS CATCHER</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    height: 100,
    width: 450,
    marginTop:30,
    backgroundColor: 'rgb(200,200,255)',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  text: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'blue',
  }
});
