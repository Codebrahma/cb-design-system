import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Box, css } from "theme-ui";
import { InlineBlock } from "./index";
import { applyVariation } from "../utils/getStyles";
import { ENTER_KEY } from '../utils/general';

const Tab = styled(InlineBlock)`
  ${({ theme }) =>
    css({
      cursor: "pointer",
      "&:hover": {
        color: "primaryDark",
        outline: "none",
      },
      "&:focus": {
        color: "primaryDark",
        outline: "none",
      },
    })(theme)}
  ${({ theme, variant }) => applyVariation(theme, `${variant}.tab`, "tabs")}
  ${({ theme, variant, selected }) =>
    selected && applyVariation(theme, `${variant}.tabSelected`, "tabs")}
`;

const TabContainer = styled(Box)`
  ${({ theme }) =>
    css({
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'darkGray',
    })(theme)}
  ${({ theme, variant }) =>
    applyVariation(theme, `${variant}.tabContainer`, "tabs")}
`;

const Content = styled(Box)`
  ${({ theme, variant }) => applyVariation(theme, `${variant}.content`, "tabs")}
`;

const Tabs = ({ children, selected, variant, ...otherProps }) => {
  const [tabSelected, setTabSelected] = useState(parseInt(selected));
  const labels = children.map(({ props: { label } }) => label);

  return (
    <Box {...otherProps}>
      <TabContainer variant={variant}>
        {labels.map((label, i) => (
          <InlineBlock>
            <Tab
              variant={variant}
              selected={i + 1 === tabSelected}
              onClick={() => setTabSelected(i + 1)}
              key={label}
              tabIndex="0"
              onKeyDown={(e) =>
                e.keyCode === ENTER_KEY ? setTabSelected(i + 1) : null
              }
            >
              {typeof label === "function" ? label() : label}
            </Tab>
          </InlineBlock>
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
  variant: "primary",
};

export default Tabs;
