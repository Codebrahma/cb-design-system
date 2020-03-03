import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'theme-ui';

const ReadMoreText = ({
  numberOfChars,
  readMoreText,
  readLessText,
  ...otherProps
}) => {
  const collapsibleText =
    typeof otherProps.children === 'string' &&
    otherProps.children.length > numberOfChars
      ? otherProps.children.toString()
      : null;
  const isCollapsible = !!collapsibleText;
  const [collapsed, setCollapsed] = useState(isCollapsible);

  if (!isCollapsible) {
    return <Text {...otherProps} />;
  }

  return (
    <Text {...otherProps}>
      {collapsed ? (
        <Fragment>
          {collapsibleText.slice(0, numberOfChars)}
          &nbsp;
          <a href='#' onClick={() => setCollapsed(false)}>
            {readMoreText}
          </a>
        </Fragment>
      ) : (
        <Fragment>
          {collapsibleText}
          &nbsp;
          <a href='#' onClick={() => setCollapsed(true)}>
            {readLessText}
          </a>
        </Fragment>
      )}
    </Text>
  );
};

ReadMoreText.propTypes = {
  numberOfChars: PropTypes.number.isRequired,
  readMoreText: PropTypes.string,
  readLessText: PropTypes.string,
};

ReadMoreText.defaultProps = {
  readMoreText: 'Read more...',
  readLessText: 'Read less...',
};

export default ReadMoreText;
