ExpositionQuery = GraphCMS::Client.parse <<-'GRAPHQL'
  query($domain: String!) {
    exposition(where: { domain: $domain }) {
      id
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

ExpositionsQuery = GraphCMS::Client.parse <<-'GRAPHQL'
  query {
    expositions {
      id
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
