import { useQuery } from "@apollo/react-hooks";
import { AUTHORIZED_USER } from '../graphql/queries';

const useUserReviews = (variables) => {

  const { data, loading, fetchMore, refetch } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: AUTHORIZED_USER,
      variables: {
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        ...variables
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          authorizedUser: {
            ...previousResult.authorizedUser,
            reviews: {
              ...fetchMoreResult.authorizedUser.reviews,
              edges: [
                ...previousResult.authorizedUser.reviews.edges,
                ...fetchMoreResult.authorizedUser.reviews.edges,
              ],
            },
          },
        };
        return nextResult;
      },
    });
  };

  //console.log('DATA_USER:', data ? data.authorizedUser : []);

  return {
    reviews: data ? data.authorizedUser.reviews.edges : [],
    fetchMore: handleFetchMore,
    loading,
    refetch
  };
};

export default useUserReviews;