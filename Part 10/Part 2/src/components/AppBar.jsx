import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    paddingBottom: 15,
    // eslint-disable-next-line no-dupe-keys
    paddingTop: 30,
  },
  text: {
    color: 'white',
    margin: 10,
  }
});

const AppBarTab = () => {
  return <View style={styles.container}>
    <Text style={styles.text}>{'Repositories'}</Text>
  </View>;
};

export default AppBarTab;