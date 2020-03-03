import styled from '@emotion/styled';
import { Box } from 'theme-ui';

const Background = styled(Box)`
  ${({ url, image, size, repeat }) => ({
    backgroundImage: url ? `url(${url})` : image,
    backgroundSize: size || 'cover',
    backgroundRepeat: repeat || 'no-repeat',
  })}
`;

export default Background;
