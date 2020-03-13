import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, css, Image, Flex } from 'theme-ui';
import { getThemeStyles } from '../utils/getStyles';
import { InlineFlex, InlineBlock } from './layout';

const Container = styled(InlineFlex)`
  justify-content: space-between;
  cursor: pointer;
  ${({ theme, variant }) =>
    css({
      content: "'contain'",
      width: '100px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'primary',
      fontSize: '13px',
      padding: 2,
      borderRadius: 1,
      ...getThemeStyles(theme, 'pill', variant),
      '&:focus': {
        outline: 0,
        borderColor: 'primaryDark',
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

const Icon = styled(Box)`
  ${({ theme, variant, iconColor }) => css({
    minWidth: 'max-content',
    color: iconColor,
  })}
  cursor: pointer;
`;

const Pill = ({
  label,
  removeIcon,
  icon,
  iconColor,
  onClick,
  onRemove,
  variant,
  ...otherProps
}) => {
  const { content, title, removetitle } = label;

  return (
    <Container
      __themeKey='pill'
      tabIndex='0'
      onClick={event => onClick(event, label)}
      variant={variant}
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
        variant={variant}
        iconColor={iconColor}
        onClick={event => {
          event.stopPropagation();
          onRemove(event, label);
        }}
      >
        {removeIcon ? (
          <Image src={removeIcon} variant='pillCloseIcon' />
        ) : <InlineBlock>&#10005;</InlineBlock>}
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
  variant: PropTypes.string,
  iconColor: PropTypes.string,
};

Pill.defaultProps = {
  removeIcon: null,
  icon: null,
  onClick: null,
  onRemove: null,
  variant: 'primary',
  iconColor: 'inherit',
};

export default Pill;
