import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'theme-ui';
import { Relative } from '../position';

import { UP_ARROW, DOWN_ARROW, ENTER_KEY, TAB_KEY } from '../../utils/general';

import {
  DropDownContainer,
  Options,
  Option,
  MultiSelectOption,
  Input,
  Selected,
  Placeholder,
  ClearIcon,
} from './component';

// TODO: Icon as a prop,both clearIcon and arrowIcon
// TODO: theming
// TODO: default value handling for isMulti

const Autocomplete = ({
  options,
  name,
  defaultValue,
  onChange,
  placeholder,
  isClearable,
  isMulti,
  ...props
}) => {
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState(isMulti ? [] : null);
  const [visible, setVisible] = useState(false);
  const [filteredOption, setFilteredOption] = useState(options);
  const [keySelected, setKeySelected] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isMulti) {
      defaultValue ? setSelected([...defaultValue]) : setSelected([]);
    } else {
      setSelected(defaultValue);
    }
  }, []);

  useEffect(() => {
    visible && document.addEventListener('click', handleOutsideClick, true);
    visible && document.addEventListener('keydown', handleKeyboardEvent, true);
    return () => {
      visible &&
        document.removeEventListener('click', handleOutsideClick, true);
      visible &&
        document.removeEventListener('keydown', handleKeyboardEvent, true);
    };
  });

  useEffect(() => {
    if (value && isFocused) {
      setVisible(true);
    }
  }, [value]);

  const SetSelectedValue = (selectedValue, e) => {
    if (isMulti) {
      setSelected([...selected, selectedValue]);
      onChange && onChange([...selected, selectedValue], e);
    } else {
      setSelected(selectedValue);
      onChange && onChange(selectedValue, e);
    }
  };

  const handleKeyboardEvent = (e) => {
    const len = filteredOption.length;

    switch (e.keyCode) {
      case UP_ARROW:
        const i = keySelected < 1 ? len - 1 : (keySelected - 1) % len;
        setKeySelected(i);
        return;
      case DOWN_ARROW:
        const index = keySelected !== null ? (keySelected + 1) % len : 0;
        setKeySelected(index);
        return;
      case ENTER_KEY:
        if (keySelected !== null) {
          setValue('');
          SetSelectedValue(filteredOption[keySelected], e);
          setKeySelected(null);
          setVisible(!visible);
        }
        return;
      case TAB_KEY:
        setVisible(!visible);
    }
  };

  const toggleVisibility = (e) => {
    e.preventDefault();
    if (!visible) {
      setFocus();
    } else {
      clearFocus();
    }
    filterOptions();
    setVisible(!visible);
    setKeySelected(null);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current.contains(e.target)) {
      return;
    }
    setValue('');
    toggleVisibility(e);
    clearFocus();
  };

  const handleChange = ({ target: { value } }) => {
    console.log(value);
    setValue(value);
    filterOptions(value);
  };

  const onOptionSelect = (option, e) => {
    setValue('');
    SetSelectedValue(option, e);
    setVisible(false);
    clearFocus();
  };

  const removeSelectedOption = (e, option) => {
    e.stopPropagation();
    const updatedValue = selected.filter(selectedOption => selectedOption.value !== option.value);
    setSelected(updatedValue);
    onChange && onChange(updatedValue);
  };

  const clearValue = (e) => {
    e.stopPropagation();

    setSelected([]);
    setValue('');
    filterOptions();
    if (isMulti) onChange && onChange([]);
    else onChange && onChange(null);
  };

  const setFocus = () => {
    setIsFocused(true);
    inputRef.current.focus();
  };

  const clearFocus = () => {
    setIsFocused(false);
    inputRef.current.blur();
  };

  const filterOptions = (inputValue = '') => {
    let filteredArr = options;

    if (isMulti) {
      filteredArr = options.filter(function (option) {
        return !selected.find(function (selctedItem) {
          return option.value === selctedItem.value;
        });
      });
    }

    const newOption = filteredArr.filter((val) =>
      val.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOption(newOption);
  };

  const displayValue = () => {
    if (isMulti) {
      if (selected.length) {
        return selected.map((selectedOption) => (
          <MultiSelectOption
            key={selectedOption.value}
            onClick={(e) => removeSelectedOption(e, selectedOption)}
          >
            {selectedOption.label}
          </MultiSelectOption>
        ));
      } else if (!value) {
        return <Placeholder>{placeholder}</Placeholder>;
      }
    } else {
      if (value) {
        return null;
      } else if (!value && !selected && defaultValue) {
        return <Selected>{defaultValue.label}</Selected>;
      } else if (!value && selected) {
        return <Selected>{selected.label}</Selected>;
      } else {
        return <Placeholder>{placeholder}</Placeholder>;
      }
    }
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
        <Flex>
          {displayValue()}
          <Input
            type='text'
            value={value}
            ref={inputRef}
            onChange={handleChange}
            onClick={(e) => console.log('onclick')}
            name={name}
            {...props}
          />
        </Flex>
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
      {filteredOption && visible && (
        <Options>
          {filteredOption.length ? (
            filteredOption.map((option, index) => (
              <Option
                key={option.value}
                hover={keySelected === index}
                onClick={(e) => onOptionSelect(option, e)}
              >
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
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool,
  onChange: PropTypes.func,
};

Autocomplete.defaultProps = {
  options: null,
  name: '',
  isClearable: true,
  onChange: null,
  defaultValue: null,
  isMulti: false,
  placeholder: 'select here..',
};

// const Photo = styled(Box)`
//   width: 30px;
//   height: 30px;
//   border-radius: 50%;
//   background: #ddd;
// `;

const A = () => {
  const options = [
    { value: 'rustic', label: 'Rustic' },
    { value: 'antique', label: 'Antique' },
    { value: 'vinyl', label: 'Vinyl' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'refurbished', label: 'Refurbished' },
    { value: 'a b', label: 'Aa Baa' },
  ];

  // const newOptions = options.map(v => {
  //   const label = (
  //     <Flex>
  //       <Photo />
  //       <span>{v.label}</span>
  //     </Flex>
  //   );

  //   return {
  //     label,
  //     value: v.value,
  //   };
  // });

  return (
    <Autocomplete
      options={options}
      placeholder='select here'
      onChange={(v) => console.log('selected', v)}
      isMulti
      // defaultValue={{ value: 'default', label: 'Default Value' }}
      // isClearable
    />
  );
};
export default A;
