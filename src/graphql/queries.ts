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

export const getTemplateById = gql`
  query getTemplateById($id: ID!) {
    findTemplateByID(id: $id) {
      name,
      language,
      tenant {
        _id,
        name
      },
      templateParameters {
        key,
        keyType,
        label,
        placeHolder,
      }
    }
  }
`;

export const getTenantTemplates = gql`
  query getTenantTemplates($id: ID!) {
    findTenantByID(id: $id) {
      templates {
        data {
          _id,
          name,
          language
        }
      }
    }
  }
`;