import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'
import { getClient } from '@faustwp/experimental-app-router'
import gql from 'graphql-tag'
import { MobileNavigation } from './MobileNavigation'

export async function Header() {
  const menuItems = await loadMenuItemsData()

  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              {menuItems.map(({ uri, label }) => {
                return (
                  <NavLink href={uri} key={uri}>
                    {label}
                  </NavLink>
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            {/* <div className="hidden md:block">
              <NavLink href="/login">Sign in</NavLink>
            </div> */}
            <Button href="/register" color="blue">
              <span>
                Get started <span className="hidden lg:inline">today</span>
              </span>
            </Button>
            <div className="-mr-1 md:hidden">
              <MobileNavigation menuItems={menuItems} />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}

async function loadMenuItemsData() {
  let client = await getClient()

  const { data } = await client.query({
    query: gql`
      query GetMenuItems {
        menuItems(where: { location: PRIMARY }) {
          nodes {
            uri
            label
          }
        }
      }
    `,
  })

  return data.menuItems.nodes as Array<{ uri: string; label: string }>
}
