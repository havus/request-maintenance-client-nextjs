import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks($offset: Int!, $limit: Int!, $filterBy: TaskFilterInput) {
    tasks(
      offset: $offset,
      limit: $limit,
      filterBy: $filterBy,
      sortBy: { field: "createdAt", direction: DESC }
    ) {
      id
      title
      description
      status
      urgency
      resolvedAt
      lastUrgencyUpdatedAt
      createdAt
      updatedAt
    }
  }
`;

export const GET_TASK = gql`
  query GetTask($id: Int!) {
    task(id: $id) {
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

