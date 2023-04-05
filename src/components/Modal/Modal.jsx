import { useEffect } from 'react';
import { Overlay, ModalImg } from './Modal.styled';

const Modal = ({ children, onModalClick }) => {
  const hideModalClick = e => {
    if (e.target.dataset.action === 'overlay') {
      onModalClick();
    }
  };

  useEffect(() => {
    const hideModalKeydown = e => {
      if (e.key === 'Escape') {
        onModalClick();
      }
    };
    window.addEventListener('keydown', hideModalKeydown);

    return () => {
      window.removeEventListener('keydown', hideModalKeydown);
    };
  }, [onModalClick]);

  return (
    <Overlay onClick={hideModalClick} data-action="overlay">
      <ModalImg>{children}</ModalImg>
    </Overlay>
  );
};
export default Modal;
