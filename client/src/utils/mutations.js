import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      user {
        _id
        name
        email
      }
      token
    }
  }
`;

export const ADD_PRESCRIPTION = gql`
  mutation addPrescription($name: String!, $synonym: String!, $rxcui: Int!, $perDay: Int) {
    addPrescription(name: $name, synonym: $synonym, rxcui: $rxcui, perDay: $perDay) {
      _id
    }
  }
`;

export const UPDATE_PRESCRIPTION = gql`
  mutation updatePrescription($_id: ID!, $perDay: Int!) {
    updatePrescription(_id: $id, perDay: $perDay) {
      _id
    }
  }
`;

export const DELETE_PRESCRIPTION = gql`
  mutation deletePrescription($_id: ID!) {
    deletePrescription(_id: $_id) {
      _id
    }
  }
`;

