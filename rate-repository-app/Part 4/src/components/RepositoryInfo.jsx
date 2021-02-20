import React from "react";
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import useSingleRepository from '../hooks/useSingleRepository';
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import ReviewItem from './ReviewItem';

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

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.flexContainerInfo} >
      <RepositoryItem item={repository} showButton={true} />
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const id = useParams().id;
  let reviews;
  const { repository, loading, fetchMore } = useSingleRepository({ id: id, first: 2 });

  if (!loading) {
    reviews = repository.reviews.edges;
  }
  
  const onEndReach = () => {
    fetchMore();
  };

  return (
    <SafeAreaView style={styles.container} >
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} showButtons={false} />}
        keyExtractor={item => item.node.id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        ListFooterComponent={ItemSeparator}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

export default SingleRepository;