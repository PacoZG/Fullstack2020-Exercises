import React from 'react';
import { Link } from "react-router-native";
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  text: {
    color: 'white',
    marginRight: 10,
  }
});

const AppBarTab = ({ link, label, onPress }) => {
  return (
    <Link to={link} component={TouchableWithoutFeedback} onPress={onPress} >
      <Text style={styles.text}>{label}</Text>
    </Link>
  );
};

export default AppBarTab;