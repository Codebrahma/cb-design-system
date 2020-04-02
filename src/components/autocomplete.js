import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, Input as input, css, Flex } from 'theme-ui';
import { Relative, Absolute } from './position';
import { InlineBlock } from './layout';

import {
  UP_ARROW,
  DOWN_ARROW,
  ENTER_KEY,
  TAB_KEY,
} from './../utils/general';

// TODO: clear the input field
// TODO: Icon as a prop,both clearIcon and arrowIcon
// TODO: loadOptions
// TODO: defaultOptions
// TODO: isloading
// TODO: multi

// const Icons = styled(InlineBlock)``

const DropDownContainer = styled(Relative)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 6px;

  ${({ theme }) =>
    css({
      '&:focus': {
        outline: 'none',
        borderColor: 'primary',
      },
    })(theme)}

  ${({ theme, focused }) =>
    css({
      borderColor: focused ? 'primary' : '',
      borderWidth: focused ? '1px' : '',
    })(theme)}
`;

const Options = styled(Absolute)`
  z-index: 1;
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
  ${({theme, hover}) => css({
    background: hover ? '#ddd' : '',
  })(theme)}
`;

const Input = styled(input)`
  border: none;
  outline: none;
  padding: 0;
  width: 2px;
  min-width: max-content;
`;

const Selected = Absolute;
const Placeholder = Absolute;

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
  const [keySelected, setKeySelected] = useState(null);

  const [isFocused, setIsFocused] = useState(false);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const optionsRef = useRef(options);

  const optionsToShow = filteredOption || options;

  useEffect(() => {
    visible && document.addEventListener('click', handleOutsideClick, true);
    visible && document.addEventListener('keydown', handleKeyboardEvent, true);
    return () => {
      visible && document.removeEventListener('click', handleOutsideClick, true);
      visible && document.removeEventListener('keydown', handleKeyboardEvent, true);
    };
  });

  useEffect(() => {
    if (value && isFocused) {
      setVisible(true);
    }
  }, [value]);

  const handleKeyboardEvent = (e) => {
    console.log('handle keydown event');
    // e.preventDefault();
    const len = optionsToShow.length;

    switch (e.keyCode) {
      case UP_ARROW:
        const i = keySelected < 1 ? len - 1 : (keySelected - 1) % len;
        setKeySelected(i);
        return;
      case DOWN_ARROW:
        const index = keySelected !== null ? ((keySelected + 1) % len) : 0;
        setKeySelected(index);
        return;
      case ENTER_KEY:
        // if (showDropdownMenu && onSelect) onSelect(options[keySelected], e);
        console.log(optionsToShow[keySelected]);
        setValue(optionsToShow[keySelected].label);
        setKeySelected(null);
        setSelected(optionsToShow[keySelected]);
        setVisible(!visible);
        return;
      case TAB_KEY:
        setVisible(!visible);
    }
  };

  const toggleVisibility = e => {
    e.preventDefault();
    if (!visible) {
      setFocus();
    } else {
      clearFocus();
    }
    setFilteredOption(null);
    setVisible(!visible);
  };

  const handleOutsideClick = e => {
    if (dropdownRef.current.contains(e.target)) {
      return;
    }
    setValue('');
    toggleVisibility(e);
    // setFilteredOption(null);
    clearFocus();
  };

  const handleChange = ({ target: { value } }) => {
    console.log(value);
    const newOptions = options.filter(option => {
      return typeof option.label === 'string' ? option.label.toLowerCase().includes(value.toLowerCase()) : option.label.contains(value);
      // if (typeof option.label === 'string') {
      //   return option.label.toLowerCase().includes(value.toLowerCase());
      // } else {
      //   const valurRef = useRef(option.label);
      //   console.log(valurRef.contains(value));
      // }
    });
    setValue(value);
    setFilteredOption(newOptions);
  };

  const onOptionSelect = option => {
    onChange && onChange(option);
    setValue('');
    setVisible(false);
    setSelected(option);
    setFilteredOption(null);
    clearFocus();
  };

  const clearValue = e => {
    e.preventDefault();
    e.stopPropagation();
    // if (value) {
    setFilteredOption(null);
    setSelected('');
    setValue('');
    // }
  };

  const setFocus = () => {
    setIsFocused(true);
    inputRef.current.focus();
  };

  const clearFocus = () => {
    setIsFocused(false);
    inputRef.current.blur();
  };

  return (
    <Relative ref={dropdownRef}>
      <DropDownContainer
        focused={isFocused}
        onClick={toggleVisibility}
        tabIndex='0'
        onFocus={setFocus}
        onBlur={clearFocus}
      >
        {!value && <Selected>{selected && selected.label}</Selected>}
        {!value && !selected && (
          <Placeholder>{placeholder}</Placeholder>
        )}
        <Input
          type='text'
          // value={value !== selected.value && !visible ? selected.label : value}
          value={value}
          ref={inputRef}
          onChange={handleChange}
          onClick={e => console.log('onclick')}
          name={name}
          {...props}
        />
        <Flex>
          {isClearable && <ClearIcon onClick={clearValue}>&times;</ClearIcon>}
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
        </Flex>
      </DropDownContainer>
      {optionsToShow && visible && (
        <Options>
          {optionsToShow.length ? (
            optionsToShow.map((option, index) => (
              <Option key={option.value} hover={keySelected === index} onClick={() => onOptionSelect(option)}>
                {option.label}
              </Option>
            ))
          ) : (
            <Option>no options found</Option>
          )}
        </Options>
      )}
    </Relative>
  );
};

Autocomplete.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  defaultValue: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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

const Photo = styled(Box)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ddd;
`;

const A = () => {
  const options = [
    { value: 'rustic', label: 'Rustic' },
    { value: 'antique', label: 'Antique' },
    { value: 'vinyl', label: 'Vinyl' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'refurbished', label: 'Refurbished' },
  ];

  const newOptions = options.map(v => {
    const label = (
      <Flex>
        <Photo />
        <span>{v.label}</span>
      </Flex>
    );

    return {
      label,
      value: v.value,
    };
  });

  return <Autocomplete options={options} />;
};
export default A;
