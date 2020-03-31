import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, Input as input, css } from 'theme-ui';
import { Relative, Absolute } from './position';
import { InlineBlock } from './layout';

// TODO: clear the input field
// TODO: Icon as a prop,both clearIcon and arrowIcon
// TODO: loadOptions
// TODO: defaultOptions
// TODO: isloading
// TODO: multi

const DropDownContainer = styled(Relative)`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 6px;

  ${({theme}) => css({
    '&:focus': {
      outline: 'none',
      borderColor: 'primary',
    },
  })(theme)}

  ${({theme, focused}) => css({
    borderColor: focused ? 'primary' : '',
  })(theme)}
`;

const Options = styled(Absolute)`
  max-height: 300px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: scroll;
  background: #fff;
`;

const Option = styled(Box)`
  cursor: pointer;
  height: max-content;
  max-height: 300px;
  border-bottom: 1px solid #ddd;
  padding: 5px;
  &:hover {
    background: #ddd;
  }
`;

const Input = styled(input)`
  border: none;
  outline: none;
  padding: 0;
  flex-grow: 1;
`;

const ClearIcon = styled(InlineBlock)`
  padding: 0 7px;
  cursor: pointer;
`;

const Autocomplete = ({
  options,
  name,
  isLoading,
  defaultValue,
  // loadOptions,
  onChange,
  placeholder,
  isClearable,
  ...props
}) => {
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState('');
  const [visible, setVisible] = useState(false);
  const [filteredOption, setFilteredOption] = useState(null);

  const [isFocused, setIsFocused] = useState(false);

  const dropdownRef = useRef(null);
  // const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    visible && document.addEventListener('click', handleOutsideClick, true);
    return () => {
      visible && document.removeEventListener('click', handleOutsideClick, true);
    };
  });

  useEffect(() => {
    if (value && isFocused) {
      setVisible(true);
    }
  });

  const toggleVisibility = (e) => {
    e.preventDefault();
    if (!visible) {
      setFocus();
    } else {
      clearFocus();
    }
    setVisible(!visible);
  };

  const handleOutsideClick = e => {
    if (dropdownRef.current.contains(e.target)) {
      return;
    }
    setValue('');
    toggleVisibility(e);
    clearFocus();
  };

  const handleChange = ({ target: { value } }) => {
    const newOptions = options.filter(option =>
      option.label.toLowerCase().includes(value.toLowerCase())
    );
    setValue(value);
    setFilteredOption(newOptions);
  };

  const onOptionSelect = option => {
    console.log('option selected');
    onChange && onChange(option);
    setValue(option.label);
    setVisible(false);
    setSelected(option);
    setFilteredOption(null);
    clearFocus();
  };

  const clearValue = (e) => {
    // e.preventDefault();
    console.log('clear value');
    e.stopPropagation();
    if (value) {
      setFilteredOption(null);
      setSelected('');
      setValue('');
    }
  };

  const setFocus = () => {
    console.log('focused');
    setIsFocused(true);
    inputRef.current.focus();
  };

  const clearFocus = () => {
    console.log('clearFocus');
    setIsFocused(false);
    inputRef.current.blur();
  };

  const Values = filteredOption || options;

  return (
    <Relative ref={dropdownRef}>
      <DropDownContainer focused={isFocused} onClick={toggleVisibility} tabIndex='0' onFocus={setFocus}>
        <Input
          type='text'
          value={value !== selected.value && !visible ? selected.label : value}
          ref={inputRef}
          onChange={handleChange}
          onClick={e => console.log('onclick')}
          name={name}
          placeholder={placeholder}
          defaultValue=''
          {...props}
        />
        {isClearable && (<ClearIcon onClick={clearValue}>&times;</ClearIcon>)}
        <svg
          height='20'
          width='20'
          viewBox='0 0 20 20'
          aria-hidden='true'
          focusable='false'
          className='css-tj5bde-Svg'
        >
          <path d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z' />
        </svg>
      </DropDownContainer>
      {Values && visible && (
        <Options>
          {Values.length ? Values.map(option => (
            <Option key={option.value} onClick={() => onOptionSelect(option)}>
              {option.label}
            </Option>
          )) : <Option>no options found</Option>}
        </Options>
      )}
    </Relative>
  );
};

Autocomplete.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })
  ),
  defaultValue: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  isLoading: PropTypes.bool,
  isClearable: PropTypes.bool,
  onChange: PropTypes.func,
};

Autocomplete.defaultProps = {
  options: null,
  name: '',
  isLoading: false,
  isClearable: true,
  onChange: null,
  defaultValue: null,
  placeholder: 'select here..',
};

const A = () => {
  const options = [
    {value: 'rustic', label: 'Rustic'},
    {value: 'antique', label: 'Antique'},
    {value: 'vinyl', label: 'Vinyl'},
    {value: 'vintage', label: 'Vintage'},
    {value: 'refurbished', label: 'Refurbished'},
  ];
  return (
    <Autocomplete options={options} />
  );
};
export default A;
