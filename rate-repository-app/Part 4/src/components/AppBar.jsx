import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from "react-native";
import { useQuery } from '@apollo/react-hooks';
import { AUTHORIZED_USER } from '../graphql/queries'; // query

import useSignOut from '../hooks/useSignOut'; // signing out function
import AppBarTab from './AppBarTab'; // Tab component

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#24292e',
    paddingBottom: 15,
    paddingTop: 40,
  },
  scrollView: {
    marginHorizontal: 5,
  },
  text: {
    color: 'white',
    marginRight: 10,
  }
});
const AppBar = () => {
  let authorizedUser;
  const { data, loading } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
  });

  if (!loading) {
    authorizedUser = data.authorizedUser;
  }
  const signOut = useSignOut();
  //console.log('AUTHORIZED_USER: ', authorizedUser);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal >
        <AppBarTab link='/' label='Repositories' />
        {!authorizedUser && <AppBarTab link='/signIn' label='Sign in' />}
        {!authorizedUser && <AppBarTab link='/signUp' label='Sign up' />}
        {authorizedUser && <AppBarTab link='/createReview' label='Create a review' />}
        {authorizedUser && <AppBarTab link='/myReviews' label='My reviews' />}
        {authorizedUser && <AppBarTab label='Sign out' onPress={() => signOut()} />}
      </ScrollView>
    </View>
  );
};

export default AppBar;