import { useQuery } from "@apollo/react-hooks";
import { SINGLE_REPOSITORY } from '../graphql/queries';

const useSingleRepository = (id) => {

  const { data, loading } = useQuery(SINGLE_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  });

  return { data, loading };
};

export default useSingleRepository;

