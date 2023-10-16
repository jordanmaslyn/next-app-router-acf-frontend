import { getClient } from '@faustwp/experimental-app-router'
import gql from 'graphql-tag'

export async function getSeoData(uri: string) {
  let client = await getClient()

  const { data } = await client.query({
    query: gql`
      query GetSeoByUri($uri: ID!) {
        page(id: $uri, idType: URI) {
          seo {
            title
            metaDesc
          }
        }
      }
    `,
    variables: {
      uri,
    },
  })

  return data.page.seo
}
