/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable linebreak-style */
import React from 'react';
import { X } from 'react-feather';
import PropTypes from 'prop-types';

// Modal.propType is at the bottom because a function EXPRESSION does not get hoisted

const Modal = ({ isOpen, toggle, children }) => (
  <>
    {isOpen
      ? (
        <div className="modalWrapper" onClick={toggle}>
          <aside className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__exitWrapper" onClick={toggle}>
              <X className="modal__exit" size={30} />
            </div>
            {children}
          </aside>
        </div>
      )
      : undefined}
  </>
);

Modal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  children: PropTypes.element,
};

export default Modal;
