import ReactPaginate from 'react-paginate';

type PaginationProps = {
  pageOffset: number;
  perPage: number;
  allItemsCount: number;
  pageCount: number;
  onPageClick: ({ selected }: { selected: number }) => void;
};

export default function Pagination({
  pageOffset,
  perPage,
  allItemsCount,
  pageCount,
  onPageClick,
}: PaginationProps) {
  return (
    <div className="c-pagination">
      <span className="c-pagination__stats">
        {pageOffset + 1}-{pageOffset + perPage} of {allItemsCount} items
      </span>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={onPageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={() => null}
        containerClassName="c-pagination__ui"
        breakClassName="c-pagination__break"
        pageClassName="c-pagination__page"
        activeClassName="c-pagination__active"
        previousClassName="c-pagination__btn"
        nextClassName="c-pagination__btn"
        disabledClassName="c-pagination__btn--disabled"
        previousAriaLabel="previous page button"
        nextAriaLabel="next page button"
      />
    </div>
  );
}
