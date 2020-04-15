import React from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import { sidebarWidth, textColor, themeColor } from '../styles';

const sidebarLinks = [
  {
    name: 'Home',
    ref: '/',
  },
  {
    name: 'Button',
    ref: '/button',
  },
  {
    name: 'Input',
    ref: '/input',
  },
  {
    name: 'Modal',
    ref: '/modal',
  },
  {
    name: 'Switch',
    ref: '/switch',
  },
  {
    name: 'Pill',
    ref: '/pill',
  },
  {
    name: 'InputGroup',
    ref: '/inputGroup',
  },
  {
    name: 'Theming',
    ref: '/theming',
  },
];

export const cssNavLink = css`
  font-size: 16px;
  text-decoration: none;
  padding: 6px 24px;
  color: ${textColor};
  position: relative;
  z-index: 2;

  &:hover {
    color: ${themeColor};
    border-right: 4px solid ${themeColor};
  }

  &.active {
    color: ${themeColor};
    border-right: 4px solid ${themeColor};
  }
`;

export const cssActiveNavLink = css``;

function Sidebar() {
  return (
    <aside
      css={css`
        min-width: ${sidebarWidth}px;
        width: ${sidebarWidth}px;
        position: fixed;
        left: 0;
        height: 100%;
        background-color: #f8f8f8;
        border-right: 1px solid #e8e8e8;
      `}
    >
      <nav
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-top: 12px;
        `}
      >
        {sidebarLinks.map(({ name, ref }) => (
          <Link key={ref} to={ref} css={cssNavLink} activeClassName="active">
            {name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
