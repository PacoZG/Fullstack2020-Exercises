import { useMutation } from "@apollo/react-hooks";
import { DELETE_REVIEW } from '../graphql/mutations';


const useDeleteReview = () => {
  const [mutate] = useMutation(DELETE_REVIEW);
  const deleteReview = async (variables) => {
    await mutate({ variables });
  };
  
  return deleteReview;
};

export default useDeleteReview;