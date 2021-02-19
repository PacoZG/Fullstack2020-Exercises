import React, { useState } from "react";
import { FlatList, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
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

//const ItemSeparator = () => <View style={styles.separator} />;

const orderOptions = [
  { label: 'Latest repositories', value: 'latest' },
  { label: 'Highest rated repositories', value: 'highest' },
  { label: 'Lowest rated repositories', value: 'lowest' },
];

export const RepositoryListContainer = ({ repositories, setValue, setSearchQuery, searchQuery, selectedValue }) => {
  const history = useHistory();
  const repositoryNodes = repositories.edges
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <View style={styles.container} >
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
        data={repositoryNodes}
        //ItemSeparatorComponent={ItemSeparator}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => history.push(`repositories/${item.id}`)} >
            <RepositoryItem key={item.id} item={item} showButton={false} />
          </TouchableOpacity>
        )}
      />
    </View>
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
    //console.log('VALUE: ', value);
    setVariables(getVariables(value));
    setSelectedValue(value);
    //console.log('VARIABLES: ', getVariables(value));
  };

  const [searchQuery, setSearchQuery] = useState('');
  //console.log('QUERY: ', searchQuery)
  const [value] = useDebounce(searchQuery, 500);
  //console.log('QUERY_AFTER_1000: ', value)

  const { repositories } = useRepositories({ ...variables, searchKeyword: value });

  //console.log('REPOSITORIES: ', repositories)

  return <RepositoryListContainer
    repositories={repositories}
    setValue={setValue}
    setSearchQuery={setSearchQuery}
    searchQuery={searchQuery}
    selectedValue={selectedValue}
  />;
};

export default RepositoryList;