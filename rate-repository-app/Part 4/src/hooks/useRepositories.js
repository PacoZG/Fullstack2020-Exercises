import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  const [repositories, setRepositories] = useState([]);
  //console.log('VARIABLES: ', variables);
  const fetchRepositories = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables
  });

  const { data, loading, fetchMore, ...result } = fetchRepositories;
  //console.log(loading);

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return {
    repositories: data ? data.repositories : [],
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;