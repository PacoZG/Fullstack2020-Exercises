import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState([]);
  const fetchRepositories = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  const { loading, data, refetch } = fetchRepositories;
  //console.log(loading);

  useEffect(() => {
    if (!loading) {
      const repositories = data ? data.repositories : [];
      setRepositories(repositories);
    }
  }, [fetchRepositories]);

  return { repositories, loading, refetch };
};

export default useRepositories;