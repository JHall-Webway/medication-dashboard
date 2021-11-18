import { gql } from '@apollo/client';

export const QUERY_SEARCH = gql`
    query($name: String!) {
        scriptSearch(name: $name) {
            name
            synonym
            rxcui
        }
    }
`;

export const QUERY_ME = gql`
    query {
        me {
            _id
            name
            email
            prescriptions {
                _id
                rxcui
                name
                synonym
                perDay
            }
        }
    }
`;


