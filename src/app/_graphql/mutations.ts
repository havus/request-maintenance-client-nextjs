import { gql } from '@apollo/client';

export const CREATE_REQUEST_MAINTENANCE = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(
      input: $input
    ) {
      id
      title
      description
      status
      urgency
      createdAt
      updatedAt
    }
  }
`;
