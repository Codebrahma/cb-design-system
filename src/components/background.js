import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Box } from 'theme-ui';

const Background = styled(Box)`
  ${({ url, image, size, repeat, bgColor, position, attachment, clip }) => ({
    backgroundImage: url ? `url(${url})` : image,
    backgroundSize: size,
    backgroundRepeat: repeat,
    backgroundColor: bgColor,
    backgroundPosition: position,
    backgroundAttachment: attachment,
    backgroundClip: clip,
  })}
`;

Background.propTypes = {
  size: PropTypes.string,
  repeat: PropTypes.string,
  bgColor: PropTypes.string,
  position: PropTypes.string,
  attachment: PropTypes.string,
  clip: PropTypes.string,
};

Background.defaultProps = {
  size: null,
  repeat: null,
  bgColor: null,
  position: null,
  attachment: null,
  clip: null,
};

export default Background;
