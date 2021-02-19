import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  flexContainerRow1: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    marginLeft: 4,
  },
  flexItem: {
    display: 'flex',
    flexGrow: 0,
    flexDirection: 'column',
  },
  flexLanguage: {
    display: 'flex',
    flexGrow: 0,
    borderRadius: 3,
    backgroundColor: '#0366d6',
    color: 'white',
    padding: 5,
  },
  logo: {
    flexGrow: 0,
    padding: 5,
    borderRadius: 5,
    width: 40,
    height: 40,
    marginRight: 20,
  },
  name: {
    flexGrow: 0,
    display: 'flex',
    fontWeight: 'bold',
    marginBottom: 7,
  },
  description: {
    marginBottom: 7,
    paddingRight: 60,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexBasis: 'auto',
    marginBottom: 7,
  }
});

const Information = ({ item }) => {
  return (
    <View style={styles.flexContainerRow1}>
      <Image
        style={styles.logo}
        source={{ uri: item.ownerAvatarUrl }}
      />
      <View style={styles.flexItem}>
        <Text testID="fullName" style={styles.name}>{item.fullName}</Text>
        <Text testID="description" style={styles.description}>{item.description}</Text>
        <View style={styles.wrapper}>
          <Text testID="language" style={styles.flexLanguage}>{item.language}</Text>
        </View>
      </View>
    </View>
  );
};

export default Information;