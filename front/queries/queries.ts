import { gql } from '@apollo/client'

export const GET_TOKEN = gql`
  mutation ($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`

export const GET_TASKS = gql`
  query {
    tasks {
      edges {
        node {
          id
          detail
          priority
          userId
          completedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`

export const GET_LANGUAGES = gql`
  query {
    languages {
      edges {
        node {
          id
          name
          experience
          from
          remark
        }
      }
    }
  }
`
