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
// class Modal extends Component {
//   hideModalKeydown = (e) => {
//     if (e.key === "Escape") {
//       this.props.onModalClick();
//     }
//   };

//   hideModalClick = (e) => {
//     if (e.target.dataset.action === "overlay") {
//       this.props.onModalClick();
//     }
//   };

//   componentDidMount() {
//     window.addEventListener("keydown", this.hideModalKeydown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.hideModalKeydown);
//   }

//   render() {
//     return (
//       <Overlay onClick={this.hideModalClick} data-action="overlay">
//         <ModalImg>{this.props.children}</ModalImg>
//       </Overlay>
//     );
//   }
// }

// export default Modal;
