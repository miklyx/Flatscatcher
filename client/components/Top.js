import React, {Component} from "react";
import {Text, View, StyleSheet} from 'react-native';

export default function Top() {
  return (
    <View style={styles.container}>
      <Text>this is TOP component</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 300,
    marginTop:30,
    backgroundColor: 'rgb(200,200,255)',

  },
});
