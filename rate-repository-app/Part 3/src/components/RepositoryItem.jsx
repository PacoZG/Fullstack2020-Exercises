import React from 'react';
import { StyleSheet, View } from 'react-native';
import Feedback from './Feedback';
import Information from './Information';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    backgroundColor: '#e1e4e8'
  },
});

const RepositoryItem = ({ item }) => {
  // console.log(item);
  return (
    <View style={styles.flexContainer}>
      <Information item={item} /> 
      <Feedback item={item} />
    </View>
  );
};

export default RepositoryItem;