import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import * as Linking from 'expo-linking';
import Text from '../components/Text';
import Feedback from './Feedback';
import Information from './Information';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    backgroundColor: 'white',
  },
  flexButton: {
    padding: 10,
    display: 'flex',
    flexGrow: 0,
    borderRadius: 3,
    backgroundColor: '#0366d6',
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10
  },
  separator: {
    height: 15,
  },
});

const handlePress = (url) => {
  Linking.openURL(url);
};

const RepositoryItem = ({ item, showButton }) => {

  if (!item) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View key={item.id} style={styles.flexContainer}>
        <Information item={item} />
        <Feedback item={item} />
        {showButton ?
          <View>
            <TouchableWithoutFeedback onPress={() => handlePress(item.url)}>
              <Text style={styles.flexButton} >{'Open in GitHub'}</Text>
            </TouchableWithoutFeedback>
          </View> : null}
      </View>
      <View style={styles.separator} />
    </View>
  );
};

export default RepositoryItem;