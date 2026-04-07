import { RotatingLines } from 'react-loader-spinner';

const ButtonLoader = () => {
  return (
    <RotatingLines
      width="20"
      visible={true}
      ariaLabel="rotating-lines-loading"
      strokeColor="#000000"
    />
  );
};

export default ButtonLoader;
