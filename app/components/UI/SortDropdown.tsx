import React, { useState } from "react";
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from "@reach/listbox";

export type SortDropdownProps = {
  options: { [key: string]: string };
  defaultValue: string;
  [x: string]: any;
  widthClassName?: string;
  inputName: string;
  onChangeSort: (value: string) => void;
};

const SortDropdown: React.FC<SortDropdownProps> = ({
  options,
  defaultValue,
  widthClassName,
  inputName,
  onChangeSort,
}) => {
  const [value, setValue] = useState(defaultValue);

  const onChangeSortHandler = (value: string) => {
    setValue(value);
    onChangeSort(value);
  };
  return (
    <ListboxInput name={inputName} value={value} onChange={onChangeSortHandler}>
      {({ value, valueLabel, isExpanded }) => (
        <>
          <ListboxButton
            className={`px-0 sm:px-5 py-2 text-gray-200 rounded text-sm flex gap-2 items-center active:outline-none focus:outline-none ${widthClassName} ${
              isExpanded && "text-gray-200/75"
            }`}
          >
            <span className="font-light">Sort by: </span>
            <span className="font-bold">{valueLabel}</span>

            <svg
              width="10"
              height="7"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current inline ml-auto"
            >
              <path
                d={isExpanded ? "M1 6l4-4 4 4" : "M1 1l4 4 4-4"}
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
          </ListboxButton>

          <ListboxPopover className="rounded shadow-xl mt-6">
            <ListboxList className="bg-white outline-transparent w-full text-gray-500 flex flex-col divide-y divide-gray-100-lighter">
              {Object.keys(options).map((option) => (
                <ListboxOption
                  key={option}
                  value={option}
                  label={options[option]}
                  className="w-full px-5 py-3 flex justify-between items-center border-b-light-800 hover:text-fushia cursor-pointer aria-selected:text-fushia"
                >
                  <span>{options[option]}</span>{" "}
                  {value === option && <span className="text-fushia">✓</span>}
                </ListboxOption>
              ))}
            </ListboxList>
          </ListboxPopover>
        </>
      )}
    </ListboxInput>
  );
};
export default SortDropdown;
