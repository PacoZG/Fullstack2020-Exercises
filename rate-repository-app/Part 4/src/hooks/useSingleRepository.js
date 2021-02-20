import { useQuery } from "@apollo/react-hooks";
import { SINGLE_REPOSITORY } from '../graphql/queries';

const useSingleRepository = (variables) => {

  const { data, loading, fetchMore } = useQuery(SINGLE_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: SINGLE_REPOSITORY,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...previousResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        };
        return nextResult;
      },
    });
  };

//console.log('DATA: ', data)

  return {
    repository: data ? data.repository : [],
    fetchMore: handleFetchMore,
    loading,
  };
};

export default useSingleRepository;

