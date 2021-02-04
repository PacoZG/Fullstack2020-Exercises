import React from 'react';
import { Link } from "react-router-native";
import { View, StyleSheet, Text } from 'react-native';
import { ScrollView } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#24292e',
    paddingBottom: 15,
    paddingTop: 40,
  },
  scrollView: {
    marginHorizontal: 0,
  },
  text: {
    color: 'white',
    marginRight: 10,
  }
});

const AppBarTab = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal >
        <Link to="/" >
          <Text style={styles.text}>{'Repositories '}</Text>
        </Link>
        <Link to="/signIn" >
          <Text style={styles.text}>{'Sign in '}</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBarTab;