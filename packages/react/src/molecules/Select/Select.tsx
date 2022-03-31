import React, { useState, useRef, useEffect, KeyboardEventHandler, createRef } from 'react';
import Text from '../../atoms/Text';

const KEY_CODES = {
  ENTER: 13,
  SPACE: 32,
  DOWN_ARROW: 40,
  ESC: 27,
  UP_ARROW: 38
};

interface SelectOption {
  label: string;
  value: string;
}

interface RenderOptionProps {
  isSelected: boolean;
  option: SelectOption;
  getOptionRecommendedProps: (overrideProps?: Object) => Object;
}

interface SelectProps {
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
  options?: SelectOption[];
  label?: string;
  renderOption?: (props: RenderOptionProps) => React.ReactNode;
}

const getNextOptionIndex = (currentIndex: number | null, options: Array<SelectOption>) => {
  if (currentIndex === null || currentIndex === options.length - 1) {
    return 0;
  }

  return currentIndex + 1;
}

const getPreviousOptionIndex = (currentIndex: number | null, options: Array<SelectOption>) => {
  if (currentIndex === null) {
    return 0;
  }

  if (currentIndex === 0) {
    return options.length - 1;
  }

  return currentIndex - 1;
}

const Select: React.FunctionComponent<SelectProps> = ({
  options = [], label = 'Please select an option...', onOptionSelected: handler, renderOption
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const labelRef = useRef<HTMLButtonElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [overlayTop, setOverlayTop] = useState<number>(0);
  const [optionRefs, setOptionRefs] = useState<React.RefObject<HTMLLIElement>[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    if (handler) {
      handler(option, optionIndex);
    }

    setSelectedIndex(optionIndex);
    setIsOpen(false);
  }

  const onLabelClick = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
  }, [labelRef.current?.offsetHeight]);

  let selectedOption = null;

  if (selectedIndex !== null) {
    selectedOption = options[selectedIndex];
  }

  useEffect(() => {
    setOptionRefs(options.map(_ => createRef<HTMLLIElement>()));
  }, [options.length]);

  useEffect(() => {
    if (highlightedIndex !== null && isOpen) {
      const ref = optionRefs[highlightedIndex];

      if (ref && ref.current) {
        ref.current.focus();
      }
    }
  }, [isOpen, highlightedIndex]);

  const highlightOption = (optionIndex: number | null) => {
    setHighlightedIndex(optionIndex);
  }

  const onButtonKeyDown: KeyboardEventHandler = (event) => {
    event.preventDefault();

    if ([KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(+event.code)) {
      setIsOpen(true);

      highlightOption(0);
    }
  }

  const onOptionKeyDown: KeyboardEventHandler = (event) => {
    if (+event.code === KEY_CODES.ESC) {
      setIsOpen(false);

      return;
    }

    if (+event.code === KEY_CODES.DOWN_ARROW) {
      highlightOption(getNextOptionIndex(highlightedIndex, options));
    }

    if (+event.code === KEY_CODES.UP_ARROW) {
      highlightOption(getPreviousOptionIndex(highlightedIndex, options));
    }

    if (+event.code === KEY_CODES.ENTER) {
      onOptionSelected(options[highlightedIndex!], highlightedIndex!);
    }
  }

  return (
    <div className='dse-select'>
      <button
        data-testid='DseSelectButton'
        onKeyDown={(e) => onButtonKeyDown(e)}
        aria-haspopup={true}
        aria-expanded={isOpen ? true : undefined}
        aria-controls='dse-select-list'
        ref={labelRef}
        className='dse-select__label'
        onClick={() => onLabelClick()}
      >
        <Text>{selectedOption === null ? label : selectedOption.label}</Text>
        <svg
          width="1rem"
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 dse-select__caret ${isOpen ? 'dse-select__caret--open' : 'dse-select__caret--closed'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <ul role='menu' id='dse-select-list' style={{ top: overlayTop }} className='dse-select__overlay'>
        {options.map((option, optionIndex) => {
          const ref = optionRefs[optionIndex];
          const isSelected = selectedIndex === optionIndex;
          const isHighlighted = highlightedIndex === optionIndex;
          const renderOptionProps = {
            ref,
            option,
            isSelected,
            tabIndex: isHighlighted ? -1 : 0,
            'aria-checked': isSelected ? true : undefined,
            'aria-label': option.label,
            onKeyDown: onOptionKeyDown,
            onMouseEnter: () => highlightOption(optionIndex),
            onMouseLeave: () => highlightOption(null),
            getOptionRecommendedProps: (overrideProps = {}) => ({
              className: `
                dse-select__option
                ${isSelected ? 'dse-select__option--selected' : ''}
                ${isHighlighted ? 'dse-select__option--highlighted' : ''}
              `,
              onClick: () => onOptionSelected(option, optionIndex),
              key: option.value,
              ...overrideProps
            })
          };
        
          if (renderOption) {
            return renderOption(renderOptionProps);
          }

          return (
            <li
              role="menuitemradio"
              {...renderOptionProps.getOptionRecommendedProps()}
            >
              <Text>
                {option.label}
              </Text>
              {isSelected &&
              <svg width="1rem" height="1rem" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>}
            </li>
          );
        })}
      </ul>
      )}
    </div>
  );
}

export default Select;