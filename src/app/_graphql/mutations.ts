import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(
      input: $input
    ) {
      id
      title
      description
      status
      urgency
      resolvedAt
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(
      input: $input
    ) {
      id
      title
      description
      status
      urgency
      resolvedAt
      createdAt
      updatedAt
    }
  }
`;
