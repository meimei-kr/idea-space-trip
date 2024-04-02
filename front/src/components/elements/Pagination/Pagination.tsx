import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MAX_PAGE_NUM } from "@/constants/constants";

export function PaginationSection({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalItems / itemsPerPage; i++) {
    pageNumbers.push(i);
  }

  const maxPageNum = MAX_PAGE_NUM;
  const pageNumLimit = Math.floor(maxPageNum / 2); // 現在のページを可能な限り中央に表示するための制限

  // 表示するページ番号
  const activePages = pageNumbers.slice(
    Math.max(0, currentPage - 1 - pageNumLimit), // 現在のページの前に表示するページ数を
    Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length), // 現在のページの後に表示するページ数
  );

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPages = () => {
    const renderedPages = activePages.map((page, index) => (
      <PaginationItem
        key={index}
        className={currentPage === page ? "bg-zinc-700 rounded-md" : ""}
      >
        <PaginationLink href="#" onClick={() => setCurrentPage(page)}>
          {page}
        </PaginationLink>
      </PaginationItem>
    ));

    const firstActivePage = activePages[0];
    if (firstActivePage && firstActivePage > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key="ellipsis-start"
          onClick={() => setCurrentPage(firstActivePage - 1)}
        />,
      );
    }

    const lastActivePage = activePages[activePages.length - 1];
    if (lastActivePage && lastActivePage < pageNumbers.length) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          onClick={() => setCurrentPage(lastActivePage + 1)}
        />,
      );
    }

    return renderedPages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={handlePrevPage} />
        </PaginationItem>
        {renderPages()}
        <PaginationItem>
          <PaginationNext href="#" onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
