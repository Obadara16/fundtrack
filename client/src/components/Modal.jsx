import { useRef } from "react";
import PropTypes from "prop-types";

function Modal({ children, close, styles }) {
  const modalRef = useRef(null);

  const handleBackgroundClick = (event) => {
    if (event.target === modalRef.current) {
      close();
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-30 overflow-auto flex items-center justify-center`}
      ref={modalRef}
      onClick={handleBackgroundClick}
    >
      {children}
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
};

export default Modal;