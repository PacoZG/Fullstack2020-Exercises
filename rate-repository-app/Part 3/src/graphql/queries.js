import { gql } from 'apollo-boost';
import { REPOSITORY_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      pageInfo{
        hasNextPage
        totalCount
        startCursor
        endCursor
      }
      edges {
        cursor
        node{
          ...NodeDetails
        }
      }
    }
  }
<<<<<<< HEAD
${REPOSITORY_DETAILS}
`;


export const SINGLE_REPOSITORY = gql`
  query repositoryDetail($id: ID!) {
    repository(id: $id) {
      ...NodeDetails
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }    
    }
  }
  ${REPOSITORY_DETAILS}
  `;

  export const AUTHORIZED_USER = gql`
    query {
      authorizedUser {
        id
        username
      }
    }
  `;