import React, { useState, useRef, useEffect } from 'react';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
  options?: SelectOption[];
  label?: string;
}

const Select: React.FunctionComponent<SelectProps> = ({
  options = [], label = 'Please select an option...', onOptionSelected: handler
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const labelRef = useRef<HTMLButtonElement>(null);
  const [overlayTop, setOverlayTop] = useState<number>(0);

  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    if (handler) {
      handler(option, optionIndex);
    }
  }

  const onLabelClick = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
  }, [labelRef.current?.offsetHeight]);

  return (
    <div className='dse-select'>
      <button ref={labelRef} className='dse-select__label' onClick={() => onLabelClick()}>
        <span>{label}</span>
        <svg width="1rem" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <ul style={{ top: overlayTop }} className='dse-select__overlay'>
        {options.map((option, optionIndex) => {
          return <li onClick={() => onOptionSelected(option, optionIndex)} key={option.value}>{option.label}</li>
        })}
      </ul>
      )}
    </div>
  );
}

export default Select;