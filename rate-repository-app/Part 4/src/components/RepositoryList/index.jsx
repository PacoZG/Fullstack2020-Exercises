import React, { useState } from "react";
import { FlatList, View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import RepositoryItem from "../RepositoryItem";
import useRepositories from "../../hooks/useRepositories";
import { useHistory } from "react-router-native";
import Header from './Header';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
  },
  separator: {
    height: 15,
  },
  searchBar: {
    shadowOpacity: 5,
    borderColor: 'gray',
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const orderOptions = [
  { label: 'Latest repositories', value: 'latest' },
  { label: 'Highest rated repositories', value: 'highest' },
  { label: 'Lowest rated repositories', value: 'lowest' },
];

export const RepositoryListContainer = ({
  repositories,
  setValue,
  setSearchQuery,
  searchQuery,
  selectedValue,
  onEndReach,
}) => {
  const history = useHistory();
  const repositoryNodes = repositories.edges
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <SafeAreaView style={styles.container} >
      <FlatList
        ListHeaderComponent={
          <Header
            orderOptions={orderOptions}
            setValue={setValue}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
            selectedValue={selectedValue}
          />
        }
        ListFooterComponent={ItemSeparator}
        data={repositoryNodes}
        keyExtractor={item => item.id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => history.push(`repositories/${item.id}`)} >
            <RepositoryItem key={item.id} item={item} showButton={false} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const getVariables = (value) => {
  switch (value) {
    case 'latest':
      return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
    case 'highest':
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
    case 'lowest':
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
    default:
      return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
  }
};

const RepositoryList = () => {
  const [variables, setVariables] = useState(getVariables());
  const [selectedValue, setSelectedValue] = useState('');
  const setValue = (value) => {
    setVariables(getVariables(value));
    setSelectedValue(value);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [value] = useDebounce(searchQuery, 500);

  const { repositories, fetchMore } = useRepositories({ ...variables, searchKeyword: value, first: 8 });

  //console.log('REPOSITORIES: ', repositories)

  const onEndReach = () => {
    //console.log('You have reached the end of the list');
    fetchMore();
  };

  return <RepositoryListContainer
    repositories={repositories}
    setValue={setValue}
    setSearchQuery={setSearchQuery}
    searchQuery={searchQuery}
    selectedValue={selectedValue}
    onEndReach={onEndReach}
  />;
};

export default RepositoryList;