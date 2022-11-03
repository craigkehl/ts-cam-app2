import React from 'react'
import classes from './Button.module.css'

type ButtonProps = { 
  className: string, 
  children: React.ReactNode,
  onClick: () => void 
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <span className={`${classes.button} ${props.className}`} onClick={props.onClick}>
      {props.children}
    </span>
  )
}

export default Button
