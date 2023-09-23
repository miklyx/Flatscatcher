import React, { useEffect, useState } from "react";
import { View,Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import moment from "moment";

export default function Preferences ({ route, navigation}) {
  
  const {userId, userData, userStats} = route.params;
  const [updatedUsername, setUpdatedUsername] = useState(userData.first_name);
  const handleUpdate = () => {
    alert('updated!');
    console.log(updatedUsername);
    console.log(userData);
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <TextInput
          style={styles.input}
          placeholder={userData.first_name}
          onChangeText={(text) => setUpdatedUsername(text)}
        />
        <TouchableOpacity onPress={handleUpdate}>
          <Text>Change profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.preferences}>
        <Text> This is last visit {moment(userStats.lastvisit).format('Do of MMMM YYYY, h:mm a')}</Text>
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
  
  preferences: {
    flex: 1,
    width: 300,
    height: 100,
    backgroundColor: 'rgb(10,200,255)',
    padding: 10,
    justifyContent: "flex-end",
    alignItems: 'center',

  }
});