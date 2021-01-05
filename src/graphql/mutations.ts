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

export const createTenantMutation = gql`
  mutation updateUser($id: ID!, $user: UserInput!) {
    updateUser(id: $id, data: $user) {
      _id,
      name,
      email,
      tenant {
        _id,
        name
      }
    }
  }
`;

export const createTemplateMutation = gql`
  mutation createTemplate($name: String!, $language: String!, $tenant: ID!) {
    createTemplate(data: {
      name: $name,
      language: $language,
      tenant: {
        connect: $tenant
      }
    }) {
      _id
      name
      language
    }
  }
`;