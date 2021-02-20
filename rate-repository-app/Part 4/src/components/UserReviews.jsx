import React from "react";
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import useUserReviews from '../hooks/useUserReviews';
import ReviewItem from '../components/ReviewItem';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
  },
  flexContainerInfo: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#e1e4e8',
  },
  separator: {
    height: 15,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {

  const { reviews, loading, fetchMore, refetch } = useUserReviews({ includeReviews: true });

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    fetchMore();
  };

  return (
    <SafeAreaView style={styles.container} >
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} showButtons={true} refetch={refetch} />}
        keyExtractor={item => item.node.id}
        ListHeaderComponent={ItemSeparator}
        ListFooterComponent={ItemSeparator}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  )
}

export default UserReviews;