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
      <span className="c-repos-overview__pagination-stats">
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
        containerClassName="c-repos-overview__pagination-ui"
        activeClassName="active-page"
      />
    </div>
  );
}
