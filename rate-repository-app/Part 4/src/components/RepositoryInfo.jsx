import React from "react";
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import useSingleRepository from '../hooks/useSingleRepository';
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
  },
  flexContainerInfo: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#e1e4e8',
  },
  flexContainerReviewRows: {
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    backgroundColor: 'white',
  },
  flexContainerReviewColumns: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    backgroundColor: 'white',
  },
  ratingContainer: {
    borderColor: '#0366d6',
    display: 'flex',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderStyle: "solid",
    borderWidth: 3,
    alignContent: 'center',
    justifyContent: 'center',
  },
  rating: {
    color: '#0366d6',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 15,
    color: 'gray'
  },
  separator: {
    height: 15,
  },
  text: {
    fontSize: 15,
    paddingRight: 55,
  },
});

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.flexContainerInfo} >
      <RepositoryItem item={repository} showButton={true} />
    </View>
  );
};

const ReviewItem = ({ review }) => {

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const d = formattedDate.getDate();
    const m = formattedDate.getMonth() + 1;
    const y = formattedDate.getFullYear();
    const day = d <= 9 ? '0' + d : d;
    const month = m <= 9 ? '0' + m : m;
    var dateToString = day + '.' + month + '.' + y;
    return dateToString;
  };

  //console.log('SINGLE_REVIEW: ', review);

  return (
    <View style={styles.flexContainerReviewRows} >
      <View style={styles.ratingContainer}>
        <Text style={styles.rating} >{review.node.rating}</Text>
      </View>
      <View style={styles.flexContainerReviewColumns}>
        <Text style={styles.name} >{review.node.user.username}</Text>
        <Text style={styles.date} >{formatDate(review.node.createdAt)}</Text>
        <Text style={styles.text} >{review.node.text}</Text>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const id = useParams().id;
  let repository;
  let reviews;
  const { data, loading } = useSingleRepository(id);
  if (!loading) {
    repository = data.repository;
    reviews = repository.reviews.edges;
  }

  if (!repository) { return null; }

  return (
    <SafeAreaView style={styles.container} >
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={item => item.node.id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        ItemSeparatorComponent={ItemSeparator}
      />
    </SafeAreaView>
  );
};

export default SingleRepository;