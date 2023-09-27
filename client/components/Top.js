import {Text, View, StyleSheet} from 'react-native';

export default function Top() {
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>The Ultimate Berlin Wohnungssuche</Text>
    </View>
    ); 
  }


const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 450,
    marginTop:30,
    backgroundColor: '#401F3E',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fbf8ea'
  }
});
