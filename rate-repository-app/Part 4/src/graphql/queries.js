import { gql } from 'apollo-boost';
import { REPOSITORY_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String, $first: Int, $after: String) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword, first: $first, after: $after) {
      pageInfo {
        totalCount
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ...NodeDetails
        }
      }
    }
  }
${REPOSITORY_DETAILS}
`;


export const SINGLE_REPOSITORY = gql`
  query repositoryDetail($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...NodeDetails
      reviews (first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          totalCount
          hasNextPage
        }
      }  
    }
  }
  ${REPOSITORY_DETAILS}
  `;

  export const AUTHORIZED_USER = gql`
  query authorizedUser($first: Int, $after: String, $includeReviews: Boolean = false) {
    authorizedUser {
      id
      username
      reviews (first: $first, after: $after) @include(if: $includeReviews) {
        edges {
          node {
            id
            userId
            repositoryId
            rating
            createdAt
            text
            repository{
              ownerName
              name
              url
            }
            user{
              username
            }
          }
          cursor
        }
        pageInfo {
          totalCount
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
`;