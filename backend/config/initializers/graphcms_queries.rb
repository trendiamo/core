ExpositionQuery = <<-'GRAPHQL'
  query($domain: String, $id: ID) {
    exposition(where: { domain: $domain, id: $id }) {
      id
      ctaText
      ctaUrl
      domain
      description
      influencer {
        name
        profilePic {
          url
        }
      }
      videos {
        videoUrl
      }
      instagramPosts {
        url
      }
    }
  }
GRAPHQL

ExpositionsQuery = <<-'GRAPHQL'
  query($domains: [String!]) {
    expositions(where: { domain_in: $domains }) {
      id
      domain
      ctaText
      ctaUrl
      description
      influencer {
        name
        profilePic {
          url
        }
      }
      videos {
        videoUrl
      }
      instagramPosts {
        url
      }
    }
  }
GRAPHQL

VideosQuery = <<-'GRAPHQL'
  query {
    videos {
      id
      status
      videoUrl
      expositions {
        id
      }
    }
  }
GRAPHQL

VideoQuery = <<-'GRAPHQL'
  query($id: ID!) {
    video(where: { id: $id }) {
      id
      status
      videoUrl
      expositions {
        id
      }
    }
  }
GRAPHQL

CreateExpositionMutation = <<-'GRAPHQL'
  mutation($domain: String!, $ctaUrl: String!, $ctaText: String!, $description: String) {
    createExposition(data: {domain: $domain, ctaUrl: $ctaUrl, ctaText: $ctaText, description: $description}) {
      id
      ctaUrl
      ctaText
      domain
      description
    }
  }
GRAPHQL

UpdateExpositionMutation = <<-'GRAPHQL'
    mutation($domain: String, $ctaUrl: String, $ctaText: String, $description: String, $id: ID) {
      updateExposition(data: {ctaUrl: $ctaUrl, domain: $domain, ctaText: $ctaText, description: $description}, where: {domain: $domain, id: $id}) {
        id
        ctaUrl
        ctaText
        domain
        description
    	}
    }
GRAPHQL

DeleteExpositionMutation = <<-'GRAPHQL'
    mutation($id: ID!) {
      deleteExposition(where: { id: $id }) {
        id
    	}
    }
GRAPHQL
