import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import PageHeader from '@/components/PageHeader'
import { getSeoData } from '@/utilities/getSeoData'
import { getClient } from '@faustwp/experimental-app-router'
import gql from 'graphql-tag'
import { Metadata } from 'next'

type GenerateMetadataProps = {
  params: { slug: string[] }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { title, metaDesc } = await getSeoData(`/${params.slug.join('/')}`)

  return {
    title: title,
    description: metaDesc,
  }
}

export default async function Home({
  params: { slug },
}: {
  params: { slug: string[] }
}) {
  const { page } = await loadPageData(`/${slug.join('/')}`)

  return (
    <>
      <Header />
      <main>
        <PageHeader {...page.pageFields.header} />
      </main>
      <Footer />
    </>
  )
}

async function loadPageData(uri: string) {
  let client = await getClient()

  const { data } = await client.query({
    query: gql`
      query GetPage($uri: ID!) {
        page(id: $uri, idType: URI) {
          pageFields {
            header {
              background {
                node {
                  sourceUrl(size: LARGE)
                }
              }
              title
              description
              pushers {
                label
                url
              }
              stats {
                number
                label
              }
            }
          }
        }
      }
    `,
    variables: {
      uri,
    },
  })

  return data
}
