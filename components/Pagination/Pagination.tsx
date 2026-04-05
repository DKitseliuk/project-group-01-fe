'use client';

import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3);
  const [marginPagesDisplayed, setMarginPagesDisplayed] = useState(1);

  useEffect(() => {
    const updatePagination = () => {
      if (window.innerWidth >= 1440) {
        setPageRangeDisplayed(1);
        setMarginPagesDisplayed(1);
        return;
      }

      if (window.innerWidth >= 768) {
        setPageRangeDisplayed(1);
        setMarginPagesDisplayed(1);
        return;
      }

      setPageRangeDisplayed(1);
      setMarginPagesDisplayed(1);
    };

    updatePagination();
    window.addEventListener('resize', updatePagination);

    return () => window.removeEventListener('resize', updatePagination);
  }, []);

  if (totalPages <= 1) return null;

  return (
    <div className={styles.paginationWrap}>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={marginPagesDisplayed}
        onPageChange={({ selected }) => onPageChange(selected + 1)}
        forcePage={page - 1}
        containerClassName={styles.pagination}
        pageClassName={styles.pageItem}
        pageLinkClassName={styles.pageLink}
        activeClassName={styles.active}
        previousClassName={`${styles.pageItem} ${styles.previous}`}
        previousLinkClassName={styles.pageLink}
        nextClassName={`${styles.pageItem} ${styles.next}`}
        nextLinkClassName={styles.pageLink}
        disabledClassName={styles.disabled}
        breakClassName={`${styles.pageItem} ${styles.break}`}
        breakLinkClassName={styles.pageLink}
        nextLabel="→"
        previousLabel="←"
        breakLabel="..."
      />
    </div>
  );
}