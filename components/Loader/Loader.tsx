'use client';

import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

interface LoaderProps {
  isLoading?: boolean;
}

const Loader = ({ isLoading = true }: LoaderProps) => {
  if (!isLoading) return null;

  return (
    <div className={css.backdrop}>
      <div className={css.logoLoader}>
        <div className="container">
          <svg width="129" height="40" aria-hidden="true">
            <use href="/img/icons.svg#icon-logo" />
          </svg>
        </div>
      </div>
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
