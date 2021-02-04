import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexGrow: 0,
    flexDirection: 'row',
    marginLeft: 4,
    justifyContent: 'space-evenly'
  },
  flexNumbers: {
    flexGrow: 0,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
    fontSize: theme.fontSizes.body,
  },
  detailsStyle: {
    justifyContent: 'center',
  },
});

const Feedback = ({ item }) => {

  return (
    <View style={styles.flexContainer}>
      <View style={styles.detailsStyle}>
        <Text style={styles.flexNumbers}>
          {(item.stargazersCount / 1000).toFixed(1)}{'k'}
        </Text>
        <Text>{'Stars'}</Text>
      </View>
      <View style={styles.detailsStyle}>
        <Text style={styles.flexNumbers}>
          {(item.forksCount / 1000).toFixed(1)}{'k'}
        </Text>
        <Text>{'Forks'}</Text>
      </View>
      <View style={styles.detailsStyle}>
        <Text style={styles.flexNumbers}>{item.reviewCount}</Text>
        <Text>{'Reviews'}</Text>
      </View>
      <View style={styles.detailsStyle}>
        <Text style={styles.flexNumbers}>{item.ratingAverage}</Text>
        <Text>{'Rating'}</Text>
      </View>
    </View>
  );
};

export default Feedback;