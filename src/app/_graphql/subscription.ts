import { gql } from '@apollo/client';

export const TASK_CREATED = gql`
  subscription {
    taskCreated {
      id
    }
  }
`;

export const TASK_UPDATED = gql`
  subscription {
    taskUpdated {
      id
    }
  }
`;
