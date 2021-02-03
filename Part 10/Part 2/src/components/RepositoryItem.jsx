import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const RepositoryItem = ({ item }) => {
  // console.log(item);
  return (
    <View style={styles.flexContainer}>
      <View style={styles.flexItemA}>
        <Image
          style={styles.logo}
          source={{ uri: item.ownerAvatarUrl }}
        />
        <View style={styles.flexItemB}>
          <Text style={styles.text1}>{item.fullName}</Text>
          <Text >{item.description}</Text>
          <Text style={styles.flexItemC}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.flexItemD}>
        <View style={styles.detailsStyle}>
          <Text style={styles.text2}>
            {(item.stargazersCount / 1000).toFixed(1)}{'k'}
          </Text>
          <Text>{'Stars'}</Text>
        </View>
        <View style={styles.detailsStyle}>
          <Text style={styles.text2}>
            {(item.forksCount  / 1000).toFixed(1)}{'k'}
            </Text>
          <Text>{'Forks'}</Text>
        </View>
        <View style={styles.detailsStyle}>
          <Text style={styles.text2}>{item.reviewCount}</Text>
          <Text>{'Reviews'}</Text>
        </View>
        <View style={styles.detailsStyle}>
          <Text style={styles.text2}>{item.ratingAverage}</Text>
          <Text>{'Rating'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    backgroundColor: '#e1e4e8'
  },
  flexItemA: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    marginLeft: 4,
  },
  flexItemB: {
    display: 'flex',
    flexWrap: 'wrap',
    flexBasis: 'auto',
    flexGrow: 0,
    flexDirection: 'column',
  },
  flexItemC: {
    flexGrow: 0,
    flexWrap: 'wrap',
    backgroundColor: '#0366d6',
    color: 'white',
  },
  flexItemD: {
    display: 'flex',
    flexGrow: 0,
    flexDirection: 'row',
    marginLeft: 4,
    justifyContent: 'space-evenly'
  },
  logo: {
    flexGrow: 0,
    padding: 5,
    borderRadius: 5,
    width: 40,
    height: 40,
    marginRight: 20,
  },
  text1: {
    flexGrow: 0,
    display: 'flex',
    fontWeight: 'bold',
  },
  text2: {
    flexGrow: 0,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  detailsStyle: {
    justifyContent: 'center',
  }
});

export default RepositoryItem;