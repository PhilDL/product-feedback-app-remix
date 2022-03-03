import React from 'react';
import { useField } from 'remix-validated-form';

export interface TextAreaFieldProps {
  label?: string;
  help?: string;
  className?: string;
  required?: boolean;
  labelSize?: string;
  [x: string]: any;
}

const TextAreaField: React.FC<TextAreaFieldProps> = (props) => {
  const { error, touched, getInputProps } = useField(props.name);
  const { label, help, className, labelSize = undefined, ...rest } = props;
  if (!label) {
    return (
      <>
        <label htmlFor={props.name} className="sr-only">
          {label}
          <small className="sr-only">{help}</small>
        </label>
        <textarea
          className={`py-3 px-6 text-gray-700 bg-gray-300 text-sm rounded-input ${className} ${
            touched && error && "outline outline-red"
          }`}
          rows={5}
          {...getInputProps({ id: props.name })}
          {...rest}
        />
        {touched && error ? (
          <small className="text-red">{error}</small>
        ) : (
          <small></small>
        )}
      </>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={props.name}
        className={`text-gray-700 ${
          labelSize ? labelSize : "text-sm"
        } font-bold flex flex-col gap-3`}
      >
        {label}
        <small className="text-gray-500 text-sm font-normal">{help}</small>
      </label>
      <textarea
        className={`py-3 px-6 text-gray-700 bg-gray-300 text-sm rounded-input ${className} ${
          touched && error && "outline outline-red"
        }`}
        rows={5}
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
export default TextAreaField;
