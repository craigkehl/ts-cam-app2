import React from 'react';

import classes from './Input.module.css';

interface InputProps {
  className?: string;
  label: string;
  input: {
    id: string;
    type?: string;
    min?: string;
    max?: string;
    step?: string;
    defaultValue?: string;
    placeholder?: string;
  };
}

const Input = React.forwardRef(
  (props: InputProps, ref: React.ForwardedRef<any>) => {
    return (
      <div className={`${classes.input} ${props.className}`}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input ref={ref} {...props.input} id={props.input.id} />
      </div>
    );
  }
);

export default Input;
