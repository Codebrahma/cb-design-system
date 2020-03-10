import React from 'react'
import App, { Container } from 'next/app'
import Link from 'next/link'
import {
  Layout,
  NavLinks,
} from 'mdx-docs'
import * as designSystem from 'cb-design-system';
import ModalDemo from './_modalDemo';
import theme from './../theme';

const routes = [
  { name: 'Home', path: '/' },
  { name: 'Getting Started', path: '/getting-started' },
  { name: 'Components', path: '/components' },
  { name: 'Modal', path: '/components/Modal' },
  { name: 'Button', path: '/components/Button' },
];
const { ThemeProvider, PortableModalContainer, ...components } = designSystem;

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let page = {}

    if (Component.getInitialProps) {
      page = await Component.getInitialProps(ctx)
    }

    return { page }
  }

  render () {
    const {
      Component,
      page,
      headManager,
      ...props
    } = this.props

    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Layout
            {...props}
            components={{
              ...components,
              ModalDemo,
              a: ({ href, ...props }) => (
                <Link href={href}>
                  <a {...props} />
                </Link>
              ),
            }}
            routes={routes}>
            <Layout.MenuToggle />
            <Layout.Sidebar>
              <NavLinks />
            </Layout.Sidebar>
            <Layout.Main>
              <PortableModalContainer />
              <Component {...page} />
            </Layout.Main>
          </Layout>
        </ThemeProvider>
      </Container>
    )
  }
}
