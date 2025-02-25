import { useState } from "react";

// usePagination.ts
export type Pagination = {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
};

export const usePagination = () => {
  const [pagination, setPagination] = useState<Pagination>({
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
  });

  const onPageSizeChange = (pageSize: number) => {
    setPagination((prev) => {
      return {
        ...prev,
        pageSize,
      };
    });
  };

  return {
    pagination,
    onPaginationChange: setPagination,
    onPageSizeChange: onPageSizeChange,
  };
};
