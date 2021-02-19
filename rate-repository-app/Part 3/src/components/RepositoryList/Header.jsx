import React from "react";
import { StyleSheet, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  defaultPicker: {
    backgroundColor: '#e1e4e8',
    borderRadius: 5,
    color: '#0366d6',
    fontSize: 15,
    paddingHorizontal: 16,
    paddingRight: 32,
    paddingVertical: 16,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    backgroundColor: '#e1e4e8',
    padding: 10,
  }
});

const placeholder = {
  label: 'Select an item...',
  value: null,
  color: '#909090'
}

const Header = ({ orderOptions, setValue, setSearchQuery, searchQuery, selectedValue }) => {
  //console.log('SELECTED_VALUE: ', selectedValue);
  const onChangeSearch = query => setSearchQuery(query);
  return (
    <View style={styles.header}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      <RNPickerSelect
        placeholder={placeholder}
        key={selectedValue}
        value={selectedValue}
        style={styles}
        items={orderOptions}
        onValueChange={setValue}
      />
    </View>
  );
};

export default Header;