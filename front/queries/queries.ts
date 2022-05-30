import { gql } from '@apollo/client'

export const GET_TOKEN = gql`
  mutation ($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`

export const GET_SINGLE_TASK = gql`
  query ($id: ID!) {
    task(id: $id) {
      id
      detail
      priority
      userId
      expireData
      completedAt
      createdAt
      updatedAt
    }
  }
`

export const GET_ALL_TASKS_ID = gql`
  query {
    tasks {
      edges {
        node {
          id
        }
      }
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
          expireData
          createdAt
          updatedAt
        }
      }
    }
  }
`

export const CREATE_TASK = gql`
  mutation (
    $userId: ID!
    $detail: String!
    $priority: Int!
    $expireData: String
  ) {
    createTask(
      input: {
        userId: $userId
        detail: $detail
        priority: $priority
        expireData: $expireData
      }
    ) {
      result
      task {
        id
        userId
        detail
        priority
        expireData
      }
    }
  }
`

export const UPDATE_TASK = gql`
  mutation (
    $id: ID!
    $userId: Int!
    $detail: String
    $expireData: String
    $completedAt: String
    $priority: Int
  ) {
    updateTask(
      input: {
        id: $id
        userId: $userId
        detail: $detail
        expireData: $expireData
        completedAt: $completedAt
        priority: $priority
      }
    ) {
      result
      task {
        id
        priority
        completedAt
        detail
      }
    }
  }
`

export const DELETE_TASK = gql`
  mutation ($id: ID!, $userId: ID!) {
    deleteTask(input: { id: $id, userId: $userId }) {
      result
      task {
        id
        detail
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
