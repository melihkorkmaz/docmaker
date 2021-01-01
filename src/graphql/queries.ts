import { gql } from 'graphql-request'

export const getCurrentUser = gql`
  query getCurrentUser {
    getCurrentUser {
      name
      email
      _id,
      tenant {
        _id,
        name
      }
    }
  }
`;