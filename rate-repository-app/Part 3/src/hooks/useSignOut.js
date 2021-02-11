import { useContext } from 'react';
import { useApolloClient} from "@apollo/react-hooks";
import { useHistory } from 'react-router-native';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignOut = () => {
  const authStorage = useContext(AuthStorageContext);
  const history = useHistory();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/');
  };
  return signOut;
};

export default useSignOut;