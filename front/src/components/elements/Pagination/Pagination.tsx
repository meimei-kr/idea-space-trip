"use client";

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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function PaginationSection({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rawPage = Number(searchParams.get("page"));
  const currentPage = Math.max(1, Math.min(rawPage, totalPages)) || 1;
  const router = useRouter();

  const createPageURL = (page: number): string => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const maxPageNum = MAX_PAGE_NUM;
  const pageNumLimit = Math.floor(maxPageNum / 2); // 現在のページを可能な限り中央に表示するための制限
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // 表示するページ番号
  const activePages = pageNumbers.slice(
    Math.max(0, currentPage - 1 - pageNumLimit), // 現在のページの前に表示するページ数を
    Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length), // 現在のページの後に表示するページ数
  );

  const renderPages = () => {
    const renderedPages = activePages.map((page, index) => (
      <PaginationItem
        key={index}
        className={currentPage === page ? "bg-zinc-700 rounded-md" : ""}
      >
        <PaginationLink href={createPageURL(page)}>{page}</PaginationLink>
      </PaginationItem>
    ));

    const firstActivePage = activePages[0];
    if (firstActivePage && firstActivePage > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key="ellipsis-start"
          onClick={() => router.push(createPageURL(firstActivePage - 1))}
        />,
      );
    }

    const lastActivePage = activePages[activePages.length - 1];
    if (lastActivePage && lastActivePage < pageNumbers.length) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          onClick={() => router.push(createPageURL(lastActivePage + 1))}
        />,
      );
    }

    return renderedPages;
  };

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={createPageURL(currentPage - 1)} />
          </PaginationItem>
        )}
        {renderPages()}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={createPageURL(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
