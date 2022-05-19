import Repos from './Repos';
import Pagination from './Pagination';

import React, { useState, useEffect } from 'react';
import { IRepo } from './types';

import reposNotFoundIcon from './assets/repos_not_found_icon.svg';
import './ReposOverview.css';

type ReposOverviewProps = {
  currentRepos: IRepo[];
  allReposLength: number;
  onPageChange: (selectedPage: number) => void;
};

export default function ReposOverview({
  currentRepos,
  allReposLength,
  onPageChange,
}: ReposOverviewProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // The number of items that have already been displayed by the previous pages
  const [pageOffset, setPageOffset] = useState(0);

  // How many items we want to show on each page
  const PER_PAGE = 4;

  useEffect(() => {
    setPageOffset(PER_PAGE * currentPage);
  }, [currentPage]);

  useEffect(() => {
    // setCurrentItems(allRepos.slice(pageOffset, pageOffset + PER_PAGE));

    setPageCount(Math.ceil(allReposLength / PER_PAGE));
  }, [allReposLength]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    onPageChange(selected);
  };

  if (allReposLength > 0) {
    return (
      <Base>
        {currentRepos && (
          <Repos totalReposCount={allReposLength} repos={currentRepos} />
        )}
        <Pagination
          pageOffset={pageOffset}
          perPage={PER_PAGE}
          allItemsCount={allReposLength}
          pageCount={pageCount}
          onPageClick={handlePageClick}
        />
      </Base>
    );
  } else {
    return (
      <Base classNameModifier="empty">
        <div className="c-repos__empty">
          <img src={reposNotFoundIcon} alt=""></img>
          <span className="c-repos__message-empty">
            Repository list is empty
          </span>
        </div>
      </Base>
    );
  }
}

function Base({
  children,
  classNameModifier,
}: {
  children?: React.ReactNode;
  classNameModifier?: string;
}) {
  return (
    <div
      className={`c-repos-overview c-repos-overview--${classNameModifier}`}
    >
      {children}
    </div>
  );
}
