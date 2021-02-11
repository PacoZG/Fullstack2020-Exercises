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