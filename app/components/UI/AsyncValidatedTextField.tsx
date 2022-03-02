import React, { useState } from "react";
import Alert from "./Alert";
import { useField } from "remix-validated-form";
import { useFetcher } from "remix";

export interface AsyncValidatedTextFieldProps {
  label: string;
  name: string;
  help?: string;
  className?: string;
  apiURI: string;
  loadingMsg?: string;
  invalidMsg?: string;
  validMsg?: string;
  [x: string]: any;
}

const AsyncValidatedTextField: React.FC<AsyncValidatedTextFieldProps> = ({
  label,
  name,
  help,
  className,
  apiURI,
  loadingMsg,
  invalidMsg,
  validMsg,
}) => {
  const { error, touched, getInputProps } = useField(name);
  const { onChange, onBlur } = getInputProps();
  const [toValidate, setToValidate] = useState<boolean>(false);
  const validationFetcher =
    useFetcher<{
      valid: boolean;
    }>();
  const onBlurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onBlur(event);
    if (!error && touched) {
      setToValidate(true);
      const inputValue = event.target.value;
      if (inputValue) {
        validationFetcher.load(`${apiURI}?${name}=${inputValue}`);
      }
    }
  };
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToValidate(false);
    onChange(event);
  };

  const getInputErrorOrSuccess = () => {
    if (error) {
      return <small className="text-red">{error}</small>;
    }
    if (!touched || !toValidate) {
      return null;
    }
    if (validationFetcher.state === "loading")
      return loadingMsg ? (
        <small className="text-gray-500">{loadingMsg}</small>
      ) : null;
    if (!validationFetcher.data) return null;
    const { valid } = validationFetcher.data;

    if (!valid)
      return invalidMsg ? (
        <small className="text-red">{invalidMsg}</small>
      ) : null;

    return validMsg ? (
      <small className="text-teal-400">{validMsg}</small>
    ) : null;
  };

  return (
    <div className="flex flex-col gap-3 mb-3">
      <label
        htmlFor={name}
        className="text-gray-700 text-sm font-bold flex flex-col gap-3"
      >
        {label}
        <small className="text-gray-500 text-sm font-normal">{help}</small>
      </label>
      <input
        className={`py-3 px-6 text-gray-700 bg-gray-300 text-sm rounded-input ${
          touched && error && "outline outline-red"
        }`}
        {...getInputProps({ id: name })}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
      />
      {getInputErrorOrSuccess()}
    </div>
  );
};

export default AsyncValidatedTextField;
