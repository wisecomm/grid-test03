import { useState } from "react";

// usePagination.ts
export type Pagination = {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
};

export const usePagination = () => {
  const [pagination] = useState<Pagination>({
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
  });

  return pagination;
};
