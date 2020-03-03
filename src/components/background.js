import styled from '@emotion/styled';
import { Box } from 'theme-ui';

const Background = styled(Box)`
  ${({ url, image, size, repeat, color, position, attachment, clip }) => ({
    backgroundImage: url ? `url(${url})` : image,
    backgroundSize: size || 'cover',
    backgroundRepeat: repeat || 'no-repeat',
    backgroundColor: color || 'transparent',
    backgroundPosition: position || 'unset',
    backgroundAttachment: attachment || 'initial',
    backgroundClip: clip || 'initial',
  })}
`;

export default Background;
