'use client';

import { RotatingLines } from 'react-loader-spinner';
import css from './loading.module.css';

const Loader = () => {
  return (
    <div className={css.backdrop}>
      <RotatingLines
        width="50"
        visible={true}
        ariaLabel="rotating-lines-loading"
        strokeColor="rgb(204 101 52)"
      />
    </div>
  );
};

export default Loader;
