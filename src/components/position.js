import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Box } from 'theme-ui';

const withPosition = (comp, position) => {
  const Positioning = ({top, bottom, left, right}) => {
    return `top: ${top};
      bottom: ${bottom};
      left: ${left};
      right: ${right};
    `;
  };

  const component = styled(comp)`
    position: ${position};
    ${Positioning}
  `;
  component.propTypes = {
    top: PropTypes.string,
    bottom: PropTypes.string,
    right: PropTypes.string,
    left: PropTypes.string,
  };
  component.defaultProps = {
    top: 'unset',
    bottom: 'unset',
    right: 'unset',
    left: 'unset',
  };

  return component;
};

const Position = styled(Box)``;

const Relative = styled(Position)`
  position: relative;
`;

const Absolute = withPosition(Position, 'absolute');

const Fixed = withPosition(Position, 'fixed');

const Sticky = withPosition(Position, 'sticky');

Position.relative = Relative;
Position.absolute = Absolute;
Position.fixed = Fixed;
Position.sticky = Sticky;

export {
  Position,
  Relative,
  Absolute,
  Fixed,
  Sticky,
};
