/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  DefaultTable,
  TableContainer,
  Tr,
  Td,
  Th,
  ArrowIcon,
  HeaderContainer,
  HeaderText,
} from './components';

const Table = ({
  dataSource,
  colNames,
  headerColor,
  variant,
  sortIcon,
  stripped,
  hoverable,
  bordered,
  ...rest
}) => {
  const [obtainedDataSource, setObtainedDataSource] = useState(dataSource);
  const [ascendingOrder, setAscendingOrder] = useState([]);

  const sort = (key, index, desc = false) => {
    const newObtainedDataSource = [...obtainedDataSource];
    newObtainedDataSource.sort((a, b) => {
      const value1 = String(a[key]).toLowerCase();
      const value2 = String(b[key]).toLowerCase();
      if (value1 > value2) return desc ? 1 : -1;
      if (value1 < value2) return desc ? -1 : 1;
      return 0;
    });
    setObtainedDataSource(newObtainedDataSource);
    const newSortIndex = [...ascendingOrder];
    newSortIndex[index] = !newSortIndex[index];
    setAscendingOrder(newSortIndex);
  };
  useEffect(() => {
    const newAscendingOrder = colNames.map((colName) => {
      if (colName.sortable) {
        return true;
      }
      return null;
    });
    setAscendingOrder(newAscendingOrder);
  }, []);

  const tableHeaderClickHandler = (sortable, colSortOrder, key, index) => {
    if (sortable) {
      if (colSortOrder) {
        sort(key, index, true);
      } else {
        sort(key, index);
      }
    }
  };

  return (
    <TableContainer {...rest} variant={variant}>
      <DefaultTable variant={variant}>
        <thead>
          <Tr hoverable={hoverable} bordered={bordered} variant={variant}>
            {colNames.map((colName, index) => (
              <Th
                key={colName.key}
                variant={variant}
                headerColor={headerColor}
                sortable={colName.sortable}
                onClick={() =>
                  tableHeaderClickHandler(
                    colName.sortable,
                    ascendingOrder[index],
                    colName.key,
                    index
                  )
                }
              >
                {colName.sortable ? (
                  <HeaderContainer>
                    <HeaderText variant={variant}>{colName.title}</HeaderText>
                    <ArrowIcon
                      ascendingOrder={
                        ascendingOrder[index]
                          ? ascendingOrder[index].toString()
                          : null
                      }
                      variant={variant}
                    >
                      {sortIcon}
                    </ArrowIcon>
                  </HeaderContainer>
                ) : (
                  <HeaderText variant={variant}>{colName.title}</HeaderText>
                )}
              </Th>
            ))}
          </Tr>
        </thead>
        <tbody>
          {obtainedDataSource.map((data, index) => {
            return (
              <Tr
                key={index}
                stripped={stripped}
                hoverable={hoverable}
                bordered={bordered}
                variant={variant}
              >
                {colNames.map((colName, columnIndex) => {
                  if (colName.render !== undefined) {
                    if (colName.key in data) {
                      return (
                        <Td
                          key={data[colName.key] + columnIndex}
                          variant={variant}
                        >
                          {colName.render(data[colName.key])}
                        </Td>
                      );
                    }

                    return null;
                  }
                  if (colName.key in data) {
                    return (
                      <Td
                        key={data[colName.key] + columnIndex}
                        variant={variant}
                      >
                        {data[colName.key]}
                      </Td>
                    );
                  }
                  return null;
                })}
              </Tr>
            );
          })}
        </tbody>
      </DefaultTable>
    </TableContainer>
  );
};

Table.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  colNames: PropTypes.arrayOf(PropTypes.object).isRequired,
  headerColor: PropTypes.string,
  variant: PropTypes.string,
  sortIcon: PropTypes.node,
  stripped: PropTypes.bool,
  hoverable: PropTypes.bool,
  bordered: PropTypes.bool,
};
Table.defaultProps = {
  headerColor: '',
  variant: 'primary',
  sortIcon: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='13'
      height='13'
      viewBox='0 0 24 24'
    >
      <path d='M12 0l8 9h-6v15h-4v-15h-6z' />
    </svg>
  ),
  stripped: false,
  hoverable: false,
  bordered: true,
};

export default Table;
