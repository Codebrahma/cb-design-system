import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { css } from '@emotion/core';
import { MDXProvider } from '@mdx-js/react';
import * as designSystem from 'cb-design-system';

import SiteMeta from './SiteMeta';
import Header from './Header';
import GlobalStyles from './GlobalStyles';
import Sidebar from './Sidebar';
import PreComponent from './PreComponent';
import Editor from './Editor';
import theme from '../theme';
import { cssPageWidth, headerHeight, sidebarWidth } from '../styles';

const {
  ThemeProvider,
  PortableModalContainer,
  components: otherPrimitiveComps,
} = designSystem;
const components = {
  ...otherPrimitiveComps,
  pre: PreComponent,
  Editor,
};

function Layout({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
    >
      {({ site: { siteMetadata } }) => (
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <SiteMeta {...siteMetadata} />
          <PortableModalContainer />
          <div
            css={css`
              min-height: calc(100vh - 18px);
              min-width: 480px;
              display: flex;
              flex-direction: column;
            `}
          >
            <Header title={siteMetadata.title} />
            <div
              css={css`
                ${cssPageWidth};
                margin: ${headerHeight}px 0 0 ${sidebarWidth}px;
                flex: 1;
                display: flex;
              `}
            >
              <Sidebar />
              <section
                css={css`
                  flex: 1;
                  padding: 24px;
                `}
              >
                <main
                  css={css`
                    width: 960px;
                    min-width: 960px;
                    margin: auto;
                  `}
                >
                  <MDXProvider components={components}>{children}</MDXProvider>
                </main>
              </section>
            </div>
          </div>
        </ThemeProvider>
      )}
    </StaticQuery>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
