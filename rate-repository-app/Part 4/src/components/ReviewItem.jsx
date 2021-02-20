import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Alert } from "react-native";
import Text from './Text';
import useDeleteReview from '../hooks/useDeleteReview';
import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    alignContent: 'center',
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
  text: {
    fontSize: 15,
    paddingRight: 55,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
  },
  flexButtonRepository: {
    padding: 15,
    display: 'flex',
    flexGrow: 0,
    borderRadius: 3,
    backgroundColor: '#0366d6',
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
  },
  flexButtonDelete: {
    padding: 15,
    display: 'flex',
    flexGrow: 0,
    borderRadius: 3,
    backgroundColor: 'darkred',
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
  }
});

const ReviewItem = ({ review, showButtons, refetch }) => {
  const history = useHistory();
  const deleteReview = useDeleteReview();
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

  const viewRepository = (id) => {
    history.push(`/repositories/${id}`)
  };

  const removeReview = async (id) => {
    console.log("DELETE Pressed", id);
    await deleteReview({ id });  
    refetch();
  }

  const handleClickDelete = (id) => {
    //console.log('You pressed delete', id);
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "CANCEL",
          onPress: () => console.log("CANCEL Pressed"),
        },
        {
          text: "DELETE",
          onPress: () => removeReview(id)
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.flexContainerReviewColumns}>
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
      {showButtons ?
        <View style={styles.buttonContainer}>
          <TouchableWithoutFeedback onPress={() => viewRepository(review.node.repositoryId)}>
            <Text style={styles.flexButtonRepository} >{'View repository'}</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => handleClickDelete(review.node.id)}>
            <Text style={styles.flexButtonDelete} >{'Delete review'}</Text>
          </TouchableWithoutFeedback>
        </View>
        : null
      }
    </View>
  );
};

export default ReviewItem;