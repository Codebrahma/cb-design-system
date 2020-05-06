import styled from '@emotion/styled';
import { Box, Text, css } from 'theme-ui';
import { applyVariation } from '../../utils/getStyles';

const TableContainer = styled(Box)`
  ${({ theme }) =>
    css({
      overflowX: 'auto',
    })(theme)}
  ${({ theme, variant }) =>
    applyVariation(theme, `${variant}.container`, 'table')}
`;

const DefaultTable = styled.table`
  ${({ theme }) =>
    css({
      borderCollapse: 'collapse',
      width: '100%',
    })(theme)}
  ${({ theme, variant }) => applyVariation(theme, `${variant}.table`, 'table')}
`;

const Tr = styled.tr`
  ${({ theme, stripped = false, hoverable = false, bordered = true }) =>
    css({
      textAlign: 'left',
      ...(stripped ? { ':nth-child(odd)': { bg: '#f2f2f2' } } : null),
      ...(hoverable ? { '&:hover': { bg: '#f2f2f2' } } : null),
      ...(bordered ? { border: '1px solid #dddddd' } : null),
    })(theme)}
  ${({ theme, variant }) => applyVariation(theme, `${variant}.tr`, 'table')}
`;

const Td = styled.td`
  ${({ theme }) =>
    css({
      bg: 'inherit',
      color: 'inherit',
    })(theme)}
  ${({ theme, variant }) => applyVariation(theme, `${variant}.td`, 'table')}
`;

const Th = styled.th`
  ${({ theme, headerColor, sortable }) =>
    css({
      bg: headerColor.length > 0 ? headerColor : 'inherit',
      cursor: sortable ? 'pointer' : 'default',
      color: 'inherit',
    })(theme)}
  ${({ theme, variant }) => applyVariation(theme, `${variant}.th`, 'table')}
`;

const ArrowIcon = styled(Box)`
  ${({ theme, ascendingOrder }) =>
    css({
      transition: 'all 0.3s ease-in-out',
      cursor: 'pointer',
      transform: ascendingOrder === 'true' ? 'rotate(0)' : 'rotate(-180deg)',
    })(theme)}
  ${({ theme, variant }) =>
    applyVariation(theme, `${variant}.arrowIcon`, 'table')}
`;

const HeaderContainer = styled(Box)`
  ${({ theme }) =>
    css({
      display: 'flex',
      alignItems: 'center',
    })(theme)}
  ${({ theme, variant }) =>
    applyVariation(theme, `${variant}.headerContainer`, 'table')}
`;
const HeaderText = styled(Text)(({ theme, variant = 'primary' }) =>
  applyVariation(theme, `${variant}.headerText`, 'table')
);

export {
  TableContainer,
  DefaultTable,
  Tr,
  Td,
  Th,
  ArrowIcon,
  HeaderContainer,
  HeaderText,
};
