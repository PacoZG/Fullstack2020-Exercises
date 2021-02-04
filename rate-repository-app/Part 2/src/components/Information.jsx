import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const styles = StyleSheet.create({
  flexContainer: {
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
  text: {
    flexGrow: 0,
    display: 'flex',
    fontWeight: 'bold',
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexBasis: 'auto',
  }
});

const Information = ({ item }) => {
  return(
    <View style={styles.flexContainer}>
        <Image
          style={styles.logo}
          source={{ uri: item.ownerAvatarUrl }}
        />
        <View style={styles.flexItem}>
          <Text style={styles.text}>{item.fullName}</Text>
          <Text >{item.description}</Text>
          <View style={styles.wrapper}>
            <Text style={styles.flexLanguage}>{item.language}</Text>
          </View>
        </View>
      </View>

  );
};

export default Information;