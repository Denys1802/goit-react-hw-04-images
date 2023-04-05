import { Btn } from './Button.styled';
const LoadMoreBtn = ({ onClick }) => {
  return (
    <Btn type="button" onClick={onClick}>
      Load more
    </Btn>
  );
};

export default LoadMoreBtn;
