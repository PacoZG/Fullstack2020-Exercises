import { gql } from 'apollo-boost';

export const SIGN_IN = gql`
mutation authorize($credentials: AuthorizeInput) {
  authorize(credentials: $credentials) {
    user{
      id
      username
    }
    accessToken
  }
}
`;

export const SIGN_UP = gql`
  mutation createUser($user: CreateUserInput){
    createUser(user: $user){
      username
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($inputs: CreateReviewInput){
    createReview(review: $inputs){
      id
      repositoryId
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!){
    deleteReview (id: $id)
  }
`;