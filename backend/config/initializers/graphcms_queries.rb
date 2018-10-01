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
