import { useMutation } from "@apollo/react-hooks";
import { CREATE_REVIEW } from '../graphql/mutations';
import { useHistory } from 'react-router-native';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {

    const { data } = await mutate({
      variables: {
        inputs: { ownerName, repositoryName, text, rating: parseInt(rating) }
      }
    });
    //console.log('DATA: ', data);
    history.push(`/repositories/${data.createReview.repositoryId}`);
    return data;
  };
  return [createReview, result];
};

export default useCreateReview;