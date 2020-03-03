import { css } from '@theme-ui/css';
import styled from '@emotion/styled';

export default (comp, beforeBlockCSS, afterBlockCSS) => styled(comp)(
  ({ theme }) => ({
    '::before': beforeBlockCSS ? css(beforeBlockCSS)(theme) : {},
    '::after': afterBlockCSS ? css(afterBlockCSS)(theme) : {},
  })
);
