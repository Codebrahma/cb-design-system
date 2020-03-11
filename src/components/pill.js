import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, css, Image, get } from 'theme-ui';

import { InlineFlex, Flex } from './index';

const variantStyles = (theme, variant = 'primary', themeKey = 'pill') =>
  get(theme, themeKey)[variant];

const Container = styled(InlineFlex)`
  justify-content: space-between;
  cursor: pointer;
  ${({ theme, variant, maxWidth, minWidth }) =>
    css({
      content: "'contain'",
      width: '100px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'primary',
      fontSize: '13px',
      padding: 2,
      borderRadius: 1,
      ...variantStyles(theme, variant),
      '&:focus': {
        outline: 0,
        borderColor: '#1589ee',
        boxShadow: '0 0 3px #0070d2',
      },
    })(theme)}
`;
const Content = styled(Box)(
  css({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  })
);
const Icon = styled(InlineFlex)`
  cursor: pointer;
`;

const Pill = ({
  label,
  removeIcon,
  icon,
  onClick,
  onRemove,
  ...otherProps
}) => {
  const { content, title, removetitle } = label;

  return (
    <Container
      __themeKey='pill'
      tabIndex='0'
      onClick={event => onClick(event, label)}
      {...otherProps}
    >
      <Flex>
        {icon && (
          <span style={{ marginRight: '2px' }}>
            <Image src={icon} variant='pillIcon' />
          </span>
        )}
        <Content title={title}>{content}</Content>
      </Flex>
      <Icon
        tabIndex='0'
        title={removetitle}
        onClick={event => {
          event.stopPropagation();
          onRemove(event, label);
        }}
      >
        {removeIcon ? (
          <Image src={removeIcon} variant='pillCloseIcon' />
        ) : (
          <span style={{ marginRight: '8px' }}>
            <svg
              viewBox='0 0 24 24'
              style={{ width: '11px', height: '11px', fill: '#888' }}
            >
              <path d='M14.3 11.7l6-6c.3-.3.3-.7 0-1l-.9-1c-.3-.2-.7-.2-1 0l-6 6.1c-.2.2-.5.2-.7 0l-6-6.1c-.3-.3-.7-.3-1 0l-1 1c-.2.2-.2.7 0 .9l6.1 6.1c.2.2.2.4 0 .6l-6.1 6.1c-.3.3-.3.7 0 1l1 1c.2.2.7.2.9 0l6.1-6.1c.2-.2.4-.2.6 0l6.1 6.1c.2.2.7.2.9 0l1-1c.3-.3.3-.7 0-1l-6-6c-.2-.2-.2-.5 0-.7z' />
            </svg>
          </span>
        )}
      </Icon>
    </Container>
  );
};

Pill.propTypes = {
  removeIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
  label: PropTypes.shape({
    content: PropTypes.string,
    title: PropTypes.string,
    removetitle: PropTypes.string,
  }).isRequired,
};
Pill.defaultProps = {
  removeIcon: null,
  icon: null,
  onClick: null,
  onRemove: null,
};
export default Pill;
