import { GraphQLClient } from 'graphql-request';

const FAUNA_ENDPOINT = process.env.REACT_APP_FAUNA_ENDPOINT || '';
const FAUNA_PUBLICK_KEY = process.env.REACT_APP_FAUNA_PUBLIC_KEY || '';

const client = new GraphQLClient(FAUNA_ENDPOINT, { headers: {
  Authorization: `Bearer ${FAUNA_PUBLICK_KEY}`
}});

export const setClientToken = (token?: string) => {
  client.setHeader('Authorization', `Bearer ${token || FAUNA_PUBLICK_KEY}`);
};

export default client;