import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,MapView } from 'react-native';
import { PROVIDER_GOOGLE} from 'react-native-maps';
// property provider=PROVIDER_GOOGLE to your <MapView>
const berlLogo="https://www.berlin.de/binaries/asset/image_assets/6274092/source/1684826673/1000x500/"

export default function App() {
  return (
    <View style={styles.container}>
      <Text>----</Text>
      <StatusBar style="auto" />
      <Text>Works!</Text>
      <Image source={{url:berlLogo}} style={styles.image} />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 150,
  }
});
