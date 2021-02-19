import React from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  flexContainerRow2: {
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

const formatNumber = (number) => {
  if (number >= 1000) {
    return (number / 1000).toFixed(1)+'k';
  } else {
    return number;
  }
};

const Feedback = ({ item }) => {

  return (
    <View style={styles.flexContainerRow2}>
      <View style={styles.detailsStyle}>
        <Text testID="stargazersCount" style={styles.flexNumbers}>
          {formatNumber(item.stargazersCount)}
        </Text>
        <Text>{'Stars'}</Text>
      </View>
      <View style={styles.detailsStyle}>
        <Text testID="forksCount" style={styles.flexNumbers}>
          {formatNumber(item.forksCount)}
        </Text>
        <Text>{'Forks'}</Text>
      </View>
      <View style={styles.detailsStyle}>
        <Text testID="reviewCount" style={styles.flexNumbers}>
          {formatNumber(item.reviewCount)}
        </Text>
        <Text>{'Reviews'}</Text>
      </View>
      <View style={styles.detailsStyle}>
        <Text testID="ratingAverage" style={styles.flexNumbers}>
          {formatNumber(item.ratingAverage)}
        </Text>
        <Text>{'Rating'}</Text>
      </View>
    </View>
  );
};

export default Feedback;