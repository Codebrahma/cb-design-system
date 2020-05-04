import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, css } from 'theme-ui';
import { InlineBlock } from './index';
import { getThemeStyles } from './../utils/getStyles';

const ENTER_KEY = 13;

const defaultStyle = themeColor => ({
  color: themeColor,
  borderBottom: '2px solid',
  borderColor: themeColor,
});

const getTheme = (theme, variant, key) =>
  getThemeStyles(theme, 'tabs', variant)[key];

const Tab = styled(InlineBlock)`
  cursor: pointer;
  ${({ theme, selected, variant }) =>
    css({
      px: 2,
      py: 3,
      ...getTheme(theme, variant, 'tab'),
      ...(selected
        ? {
          ...defaultStyle('primaryDark'),
          ...getTheme(theme, variant, 'tabSelected'),
        }
        : {}),
      '&:hover, &:focus': {
        outline: 'none',
        ...defaultStyle('primary'),
      },
    })(theme)}
`;

const TabContainer = styled(Box)`
  ${({theme, variant}) => css({
    borderBottom: '1px solid #888',
    ...getTheme(theme, variant, 'tabContainer'),
  })(theme)}
`;

const Content = styled(Box)`
  ${({ theme, variant }) =>
    css({
      ...getTheme(theme, variant, 'content'),
    })(theme)}
`;

const Tabs = ({ children, selected, variant, ...otherProps }) => {
  const [tabSelected, setTabSelected] = useState(parseInt(selected));
  const labels = children.map(({ props: { label } }) => label);

  return (
    <Box {...otherProps}>
      <TabContainer variant={variant}>
        {labels.map((label, i) => (
          <Tab
            variant={variant}
            selected={i + 1 === tabSelected}
            onClick={() => setTabSelected(i + 1)}
            key={label}
            tabIndex='0'
            onKeyDown={e =>
              e.keyCode === ENTER_KEY ? setTabSelected(i + 1) : null
            }
          >
            {label}
          </Tab>
        ))}
      </TabContainer>
      <Content variant={variant}>
        {children.map((child, i) =>
          i + 1 === tabSelected ? child.props.children : null
        )}
      </Content>
    </Box>
  );
};

Tabs.tab = Tab;

Tabs.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  variant: PropTypes.string,
};
Tabs.defaultProps = {
  selected: 1,
  variant: 'primary',
};

const T = () => {
  return (
    <Tabs selected='1'>
      <Tabs.tab label='tab1'>This is tab test1</Tabs.tab>
      <Tabs.tab label='tab2'>You can render anything you want here</Tabs.tab>
      <Tabs.tab label='tab3'>This is tab test3</Tabs.tab>
    </Tabs>
  );
};

export default T;
