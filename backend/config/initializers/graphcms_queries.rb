ExpositionQuery = GraphCMS::Client.parse <<-'GRAPHQL'
  query($domain: String!) {
    exposition(where: { domain: $domain }) {
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

ExpositionsQuery = GraphCMS::Client.parse <<-'GRAPHQL'
  query {
    expositions {
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

VideosQuery = GraphCMS::Client.parse <<-'GRAPHQL'
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

VideoQuery = GraphCMS::Client.parse <<-'GRAPHQL'
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

CreateExpositionMutation = GraphCMS::Client.parse <<-'GRAPHQL'
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

UpdateExpositionMutation = GraphCMS::Client.parse <<-'GRAPHQL'
    mutation( $domain: String, $ctaUrl: String, $ctaText: String, $description: String) {
      updateExposition(data: {ctaUrl: $ctaUrl, domain: $domain, ctaText: $ctaText, description: $description}, where: {domain: $domain}) {
        id
        ctaUrl
        ctaText
        domain
        description
    	}
    }
GRAPHQL
