import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'
import { getSeoData } from '@/utilities/getSeoData'
import { getClient } from '@faustwp/experimental-app-router'
import gql from 'graphql-tag'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const { title, metaDesc } = await getSeoData('/')

  return {
    title: title,
    description: metaDesc,
  }
}

export default async function Home() {
  const { page } = await loadPageData()

  return (
    <>
      <Header />
      <main>
        <Hero {...page.homepageFields.hero} />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}

async function loadPageData() {
  let client = await getClient()

  const { data } = await client.query({
    query: gql`
      query GetHomepage {
        menuItems(where: { location: PRIMARY }) {
          nodes {
            uri
            label
          }
        }
        page(id: "/", idType: URI) {
          homepageFields {
            hero {
              title
              subtitle
              ctas {
                label
                url
                style
              }
              customers {
                intro
                logos {
                  logo {
                    node {
                      sourceUrl
                      altText
                      mediaDetails {
                        width
                        height
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  })

  return data
}
