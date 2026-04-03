import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

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
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={page - 1}
      containerClassName={styles.pagination}
      pageClassName={styles.pageItem}
      pageLinkClassName={styles.pageLink}
      activeClassName={styles.active}
      previousClassName={styles.pageItem}
      previousLinkClassName={styles.pageLink}
      nextClassName={styles.pageItem}
      nextLinkClassName={styles.pageLink}
      disabledClassName={styles.disabled}
      breakClassName={styles.pageItem}
      breakLinkClassName={styles.pageLink}
      nextLabel="→"
      previousLabel="←"
    />
  );
}