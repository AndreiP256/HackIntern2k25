import { gql } from "graphql-request";

export const LOGIN = gql`
  mutation login($authInput: AuthInput!) {
    login(authInput: $authInput) {
      access_token
    }
  }
`;

export const REGISTER = gql`
  mutation($regInput: RegInput!) {
    register(regInput: $regInput) {
    id}
  }
`;