import React from 'react'
import classes from './Button.module.css'

type ButtonProps = {
  className: string,
  children: React.ReactNode,
  onClick: () => void,
  disabled?: boolean,
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <span
      className={`${classes.button} ${props.className}${props.disabled ? ` ${classes.disabled}` : ''}`}
      onClick={props.disabled ? undefined : props.onClick}
    >
      {props.children}
    </span>
  )
}

export default Button
