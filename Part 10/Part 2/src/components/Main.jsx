import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBarTab from './AppBar';

const Main = () => {
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => alert('Pressed!') }>
        <AppBarTab />
      </TouchableWithoutFeedback>
      <RepositoryList />
    </View>
  );
};

export default Main;