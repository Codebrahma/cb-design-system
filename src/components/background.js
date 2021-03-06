import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Box, css } from 'theme-ui';

const Background = styled(Box)`
  ${({
    url,
    image,
    size,
    repeat,
    bgColor,
    position,
    attachment,
    clip,
    theme,
  }) =>
    css({
      backgroundImage: url ? `url(${url})` : image,
      backgroundSize: size,
      backgroundRepeat: repeat,
      bg: bgColor,
      backgroundPosition: position,
      backgroundAttachment: attachment,
      backgroundClip: clip,
    })(theme)}
`;

Background.propTypes = {
  size: PropTypes.string,
  repeat: PropTypes.string,
  bgColor: PropTypes.string,
  position: PropTypes.string,
  attachment: PropTypes.string,
  clip: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.node,
};

Background.defaultProps = {
  size: null,
  repeat: null,
  bgColor: null,
  position: null,
  attachment: null,
  clip: null,
  url: null,
  image: null,
};

export default Background;
