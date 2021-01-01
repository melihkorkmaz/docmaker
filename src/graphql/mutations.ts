import { gql } from 'graphql-request'

export const loginMutation = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const registerMutation = gql`
  mutation register($email: String!, $password: String!, $name: String!) {
    register(email: $email, password: $password, name: $name) {
      _id,
    }
  }
`;