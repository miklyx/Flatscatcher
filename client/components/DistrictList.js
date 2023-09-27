//EXPERIMENTAL - custom component to have a district list in dropdown menu to select one or many


import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, View } from 'react-native';

export default function DistrictList ({options}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  /* TECH DEBT - tried to implement dropdown when selecting a district - not working
  const renderOptions = () => {
    return options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={styles.option}
        onPress={() => setSelectedOption(option)}
      >
        <Text>{option}</Text>
      </TouchableOpacity>
    ));
  }; */

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleDropdownToggle}
      >
        {isDropdownOpen ? 'Up' : 'Down'}
      </TouchableOpacity>
      {isDropdownOpen && (
        <ScrollView style={styles.dropdown}>
          {/*{renderOptions()}*/}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  option: {
    width: 100,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    width: 100,
    height: 200,
  },
});
  // TECH DEBT - tried to implement dropdown when selecting a district - not working

  //const options = ['KREUZBERG', 'MITTE', 'FRIEDRICHSHAIN'];

//    <Dropdown options={options} />
