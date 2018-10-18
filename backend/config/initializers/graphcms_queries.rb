WebsiteQuery = <<-'GRAPHQL'
  query($id: ID) {
    website(where: {id: $id}) {
      id
      title
      status
      name
      subtitle
      chats {
        id
        path
        influencer {
          name
          description
          profilePic {
            url
          }
        }
      }
      spotlights {
        id
        influencer {
          name
          description
          profilePic {
            url
          }
        }
        productPicks {
          url
          name
          description
          displayPrice
          picture {
            url
          }
        }
      }
    }
  }
GRAPHQL

WebsitesQuery = <<-'GRAPHQL'
  query($ids: [ID!]) {
    websites(where: { id_in: $ids }) {
      id
      title
      status
      subtitle
      name
      chats {
        id
        path
        influencer {
          name
          description
          profilePic {
            url
          }
        }
      }
      spotlights {
        id
        influencer {
          name
          description
          profilePic {
            url
          }
        }
        productPicks {
          url
          name
          description
          displayPrice
          picture {
            url
          }
        }
      }
    }
  }
GRAPHQL

UpdateWebsiteMutation = <<-'GRAPHQL'
    mutation($subtitle: String, $title: String, $name: String, $id: ID, $status: Status) {
      updateWebsite(data: {subtitle: $subtitle, title: $title, name: $name, status: $status}, where: {name: $name, id: $id}) {
        id
        title
        status
        subtitle
        name
    	}
    }
GRAPHQL

HostnameQuery = <<-'GRAPHQL'
  query($id: ID) {
    hostname(where: { id: $id }) {
      id
      status
      hostname
      website {
        id
      }
    }
  }
GRAPHQL

HostnamesQuery = <<-'GRAPHQL'
  query($id: ID) {
    hostnames(where: { website: {id: $id } }) {
      id
      status
      hostname
      website {
        id
      }
    }
  }
GRAPHQL

CreateHostnameMutation = <<-'GRAPHQL'
  mutation($hostname: String!, $status: Status, $website_id: ID) {
    createHostname(data: {hostname: $hostname, status: $status, website: {connect: {id: $website_id}}}) {
      id
      status
      hostname
      website {
        id
      }
    }
  }
GRAPHQL

UpdateHostnameMutation = <<-'GRAPHQL'
    mutation($hostname: String!, $status: Status, $id: ID) {
      updateHostname(data: {hostname: $hostname, status: $status}, where: {id: $id}) {
        id
        status
        hostname
        website {
          id
        }
    	}
    }
GRAPHQL

DeleteHostnameMutation = <<-'GRAPHQL'
    mutation($id: ID!) {
      deleteHostname(where: {id: $id}) {
        id
    	}
    }
GRAPHQL

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
      status
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
      status
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
  mutation($domain: String!, $ctaUrl: String!, $ctaText: String!, $description: String, $status: Status) {
    createExposition(data: {domain: $domain, ctaUrl: $ctaUrl, ctaText: $ctaText, description: $description, status: $status}) {
      id
      ctaUrl
      ctaText
      domain
      description
      status
    }
  }
GRAPHQL

UpdateExpositionMutation = <<-'GRAPHQL'
    mutation($domain: String, $ctaUrl: String, $ctaText: String, $description: String, $id: ID, $status: Status) {
      updateExposition(data: {ctaUrl: $ctaUrl, domain: $domain, ctaText: $ctaText, description: $description, status: $status}, where: {domain: $domain, id: $id}) {
        id
        ctaUrl
        ctaText
        domain
        description
        status
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
