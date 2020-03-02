import styled from '@emotion/styled';
import { Box } from 'theme-ui';

const Position = styled(Box)``;

const Relative = styled(Position)`
  position: relative;
  z-index: 0;
`;

const Absolute = styled(Position)`
  position: absolute;
`;

const Fixed = styled(Position)`
  position: fixed;
`;

const Sticky = styled(Position)`
  position: sticky;
`;

Position.relative = Relative;
Position.absolute = Absolute;
Position.fixed = Fixed;
Position.sticky = Sticky;

export {
  Position,
  Relative,
  Absolute,
  Fixed,
  Sticky
};
