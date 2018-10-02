CreateExpositionMutation = GraphCMS::Client.parse <<-'GRAPHQL'
  mutation($data: ExpositionCreateInput!) {
    createExposition(data: $data}){ id }
  }
GRAPHQL
