import React from "react";
import { useField } from "remix-validated-form";

export interface TextFieldProps {
  label: string;
  name: string;
  help?: string;
  className?: string;
  required?: boolean;
  [x: string]: any;
}

const TextField: React.FC<TextFieldProps> = (props) => {
  const { error, touched, getInputProps } = useField(props.name);
  const { label, help, className, ...rest } = props;
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={props.name}
        className="text-gray-700 text-sm font-bold flex flex-col gap-3"
      >
        {label}
        <small className="text-gray-500 text-sm font-normal">{help}</small>
      </label>
      <input
        className={`py-3 px-6 text-gray-700 bg-gray-300 text-sm rounded-input ${className} ${
          touched && error && "outline outline-red"
        }`}
        {...getInputProps({ id: props.name })}
        {...rest}
      />
      {touched && error ? (
        <small className="text-red">{error}</small>
      ) : (
        <small></small>
      )}
    </div>
  );
};
export default TextField;
