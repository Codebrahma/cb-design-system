import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, css } from 'theme-ui';
import { InlineBlock } from './index';
import { applyVariation } from '../utils/getStyles';

const ENTER_KEY = 13;

const Tab = styled(InlineBlock)`
  ${({ theme }) => css({
    cursor: 'pointer',
    '&:hover': {
      color:'success',
      outline: 'none',
    },
    '&:focus': {
      color: 'primaryLight',
      outline: 'none',
    }
  })(theme)}

  ${({ theme, variant }) => applyVariation(theme, `${variant}.tab`, 'tabs')}
  ${({ theme, variant, selected }) => selected && applyVariation(theme, `${variant}.tabSelected`, 'tabs')}
`;

const TabContent = styled(InlineBlock)`
  ${({ theme, variant }) => applyVariation(theme, `${variant}.tabContent`, 'tabs')}
`;

const TabContainer = styled(Box)`
  ${({ theme }) => css({
    borderBottom: '1px solid #888',
  })(theme)}
  ${({ theme, variant }) => applyVariation(theme, `${variant}.tabContainer`, 'tabs')}
`;

const Content = styled(Box)`
  ${({theme, variant}) => applyVariation(theme, `${variant}.content`, 'tabs')}
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
            {console.log(typeof label)}
            <TabContent variant={variant}>{typeof label === 'function' ? label() : label}</TabContent>
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

Tabs.tab = Box;

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
      <Tabs.tab label='Tab 1'>This is tab test1</Tabs.tab>
      <Tabs.tab label='Tab 2'>You can render anything you want here</Tabs.tab>
      <Tabs.tab label='Tab 3'>This is tab test3</Tabs.tab>
    </Tabs>
  );
};

export default T;
