import { gql } from 'apollo-boost';

export const PAGE_INFO = gql`
  fragment PageInfo on Repository {
    hasNextPage
    totalCount
    startCursor
    endCursor
  }
`;

export const REPOSITORY_DETAILS = gql`
  fragment NodeDetails on Repository {
    id
    name
    fullName
    reviewCount
    ratingAverage
    forksCount
    stargazersCount
    openIssuesCount
    description
    language
    url
    ownerAvatarUrl
    authorizedUserHasReviewed
  }
`;