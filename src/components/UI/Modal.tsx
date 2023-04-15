import React from 'react';
import { createPortal } from 'react-dom';
import classes from './Modal.module.css';

// TODO: Add correct typing
type PropsBackdrop = {
  onClose?: any
}

const Backdrop = ({ onClose }: PropsBackdrop) => {
  return <div className={classes.backdrop} onClick={onClose} />
}

// TODO: Add correct typing
type PropsModalOverlay = {
  onClose?: any;
  children: any;
}

const ModalOverlay = ({children}: PropsModalOverlay) => {
  return <div className={classes.modal}>{ children }</div>
}

// TODO: Add correct typing
type ModalProps = {
  onClose?: any;
  className?: string;
  children?: React.ReactNode
}

const Modal = ({ onClose, className, children}: ModalProps) => {
  return (
    <>
      {createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById('backdrop-root')!
      )}
      {createPortal(
        <ModalOverlay onClose={onClose}>{children}</ModalOverlay>,
        document.getElementById('modal-root')!
      )}
    </>
  )
};

export default Modal;
