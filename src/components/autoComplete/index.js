import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
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
  Icon,
  CustomIcon,
} from './component';

const Autocomplete = ({
  options,
  name,
  defaultValue,
  onChange,
  placeholder,
  isClearable,
  isMulti,
  onBlur,
  onFocus,
  variant,
  closeIcon,
  tabIndex,
  visibilityIcon,
  ...props
}) => {
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState(isMulti ? [] : null);
  const [visible, setVisible] = useState(false);
  const [suggestions, setSuggestions] = useState(options);
  const [keySelected, setKeySelected] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isMulti) {
      defaultValue && setSelected([...defaultValue]);
    } else {
      setSelected(defaultValue);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      document.addEventListener('click', handleOutsideClick, true);
      document.addEventListener('keydown', handleKeyboardEvent, true);
    }
    return visible ? () => {
      if (visible) {
        document.removeEventListener('click', handleOutsideClick, true);
        document.removeEventListener('keydown', handleKeyboardEvent, true);
      }
    } : undefined;
  });

  useEffect(() => {
    if (value && isFocused) {
      setVisible(true);
    }
  }, [value, isFocused]);

  const setSelectedValue = useCallback((selectedValue, e) => {
    if (isMulti) {
      const selectedValues = [...selected, selectedValue];
      setSelected(selectedValues);
      onChange && onChange(selectedValues, e);
    } else {
      setSelected(selectedValue);
      onChange && onChange(selectedValue, e);
    }
  });

  const handleKeyboardEvent = useCallback((e) => {
    const len = suggestions.length;

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
          setSelectedValue(suggestions[keySelected], e);
          setKeySelected(null);
          setVisible(!visible);
        }
        return;
      case TAB_KEY:
        setVisible(!visible);
    }
  }, [keySelected, visible]);

  const toggleVisibility = (e) => {
    e.preventDefault();
    filterOptions();
    setVisible(!visible);
    setKeySelected(null);
  };

  const handleOutsideClick = useCallback((e) => {
    if (dropdownRef.current.contains(e.target)) {
      return;
    }
    setValue('');
    toggleVisibility(e);
    clearFocus();
  });

  const handleChange = ({ target: { value } }) => {
    setValue(value);
    filterOptions(value);
  };

  const onOptionSelect = useCallback((option, e) => {
    setValue('');
    setSelectedValue(option, e);
    setVisible(false);
    clearFocus();
  });

  const removeSelectedOption = useCallback((e, option) => {
    e.stopPropagation();
    const updatedValue = selected.filter(
      (selectedOption) => selectedOption.value !== option.value
    );
    setSelected(updatedValue);
    onChange && onChange(updatedValue);
  }, [selected]);

  const clearValue = (e) => {
    e.stopPropagation();
    setSelected([]);
    setValue('');
    filterOptions();
    if (isMulti) onChange && onChange([]);
    else onChange && onChange(null);
  };

  const setFocus = useCallback(() => {
    if (!isFocused) {
      onFocus && onFocus();
      setIsFocused(true);
      inputRef.current.focus();
    }
  }, [isFocused]);

  const clearFocus = useCallback(() => {
    if (isFocused) {
      onBlur && onBlur();
      setIsFocused(false);
      inputRef.current.blur();
    }
  }, [isFocused]);

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
    setSuggestions(newOption);
  };

  const displayValue = () => {
    if (isMulti) {
      if (selected.length) {
        return selected.map((selectedOption) => (
          <MultiSelectOption
            key={selectedOption.value}
            onClick={(e) => removeSelectedOption(e, selectedOption)}
            variant={variant}
          >
            {selectedOption.label}
          </MultiSelectOption>
        ));
      } else if (!value) {
        return <Placeholder variant={variant}>{placeholder}</Placeholder>;
      }
    } else {
      if (value) {
        return null;
      } else if (!value && !selected && defaultValue) {
        return <Selected>{defaultValue.label}</Selected>;
      } else if (!value && selected) {
        return <Selected>{selected.label}</Selected>;
      } else {
        return <Placeholder variant={variant}>{placeholder}</Placeholder>;
      }
    }
  };
  console.log(inputRef);
  return (
    <Relative ref={dropdownRef}>
      <DropDownContainer
        focused={isFocused}
        onClick={toggleVisibility}
        tabIndex={tabIndex}
        onFocus={setFocus}
        onBlur={clearFocus}
        variant={variant}
      >
        <Flex css={{ flexGrow: '1', flexWrap: 'wrap', alignItems: 'center' }}>
          {displayValue()}
          <Input
            type='text'
            value={value}
            ref={inputRef}
            onChange={handleChange}
            name={name}
            {...props}
          />
        </Flex>
        <Flex css={{ minWidth: 'max-content' }}>
          {isClearable && (
            closeIcon ? (<CustomIcon src={closeIcon} variant={variant} alt='icon' />) : (
              <Icon onClick={clearValue}>
                <svg
                  height='20'
                  width='20'
                  viewBox='0 0 20 20'
                  aria-hidden='true'
                  focusable='false'
                  fill='#929292'
                >
                  <path d='M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z' />
                </svg>
              </Icon>
            )
          )}
          {visibilityIcon ? (<CustomIcon src={closeIcon} variant={variant} alt='icon' />) : (<Icon>
            <svg
              height='20'
              width='20'
              viewBox='0 0 20 20'
              aria-hidden='true'
              focusable='false'
              fill='#929292'
            >
              <path d='M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z' />
            </svg>
          </Icon>)}
        </Flex>
      </DropDownContainer>
      {suggestions && visible && (
        <Options variant={variant}>
          {suggestions.length ? (
            suggestions.map((option, index) => (
              <Option
                key={option.value}
                hover={keySelected === index}
                onClick={(e) => onOptionSelect(option, e)}
                variant={variant}
                onMouseEnter={() => setKeySelected(index)}
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
  defaultValue: PropTypes.oneOfType([
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      })
    ),
  ]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  tabIndex: PropTypes.string,
  closeIcon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  visibilityIcon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
};

Autocomplete.defaultProps = {
  options: null,
  name: '',
  isClearable: true,
  onChange: null,
  onFocus: null,
  onBlur: null,
  defaultValue: null,
  isMulti: false,
  placeholder: 'select here..',
  variant: 'primary',
  closeIcon: null,
  visibilityIcon: null,
  tabIndex: '0',
};

export default memo(Autocomplete);
