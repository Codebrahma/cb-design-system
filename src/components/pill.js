import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, css, Image } from 'theme-ui';
import { ENTER_KEY } from '../utils/general';
import { getThemeStyles } from '../utils/getStyles';
import { InlineFlex, InlineBlock } from './layout';

const Container = styled(InlineFlex)`
  justify-content: space-between;
  cursor: pointer;
  ${({ theme, variant }) =>
    css({
      width: '100px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'primary',
      fontSize: '13px',
      padding: 2,
      borderRadius: 1,
      '&:focus': {
        outline: 0,
        borderColor: 'primaryDark',
        boxShadow: '0 0 3px #0070d2',
      },
      ...getThemeStyles(theme, 'pill', variant, 'container'),
    })(theme)}
`;

const Content = styled(Box)(({ theme, variant }) =>
  css({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    ...getThemeStyles(theme, 'pill', variant, 'content'),
  })
);

const Icon = styled(Box)`
  ${({ theme, variant }) =>
    css({
      minWidth: 'max-content',
      cursor: 'pointer',
      color: 'darkGray',
      '&:focus': {
        outline: 'none',
        color: 'error',
      },
      ...getThemeStyles(theme, 'pill', variant, 'closeIcon'),
    })}
`;

const Pill = ({
  id,
  onClick,
  onRemove,
  variant,
  icon,
  content,
  ...otherProps
}) => {
  return (
    <Container
      {...otherProps}
      __themeKey='pill'
      tabIndex='0'
      id={id}
      variant={variant}
      onClick={event => onClick(event, id)}
      onKeyDown={event => (event.keyCode === ENTER_KEY ? onClick(event, id) : null)}
    >
      <Content variant={variant}>{content}</Content>
      <Icon
        tabIndex='0'
        variant={variant}
        onClick={event => {
          event.stopPropagation();
          onRemove(event, id);
        }}
        onKeyDown={e => (e.keyCode === ENTER_KEY ? onRemove(e, id) : null)}
      >
        {icon ? <Image src={icon} /> : <InlineBlock>&#10005;</InlineBlock>}
      </Icon>
    </Container>
  );
};

Pill.propTypes = {
  id: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

Pill.defaultProps = {
  id: '',
  variant: 'primary',
  icon: null,
  onClick: null,
  onRemove: null,
};

export default Pill;
