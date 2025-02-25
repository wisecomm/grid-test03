"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { columns, Payment } from "./columns";
import { DataTable, DataTableHandle } from "@/components/custom/data-table/data-table";
import { PageDtToolbarPropsToolbar } from "./page-dt-toolbar";
import { Button } from "@/components/ui/button";
import { fetchData1, fetchData2 } from "./test-data";
import { usePagination } from "@/components/custom/data-table/usePagination";
import { PaginationState, Updater } from "@tanstack/table-core";

export default function TaskPage() {
  const tableRef = useRef<DataTableHandle>(null);
  const [tableData, setTableData] = useState<Payment[]>([]);
  const [testPage, setTestPage] = useState<number>(1);

  const { pagination } = usePagination();

  useEffect(() => {
    async function loadData() {
      const data = await fetchData1();
      setTableData(data);
      pagination.totalCount = data.length;
    }
    loadData();
  }, []);

  async function onPaginationChange(updaterOrValue: Updater<PaginationState>) {
    if (typeof updaterOrValue === "function") {
      // If it's a function updater
      const newState = updaterOrValue({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      });
      console.log("New page index:", newState.pageIndex);
      //      console.log("New page size:", newState.pageSize);
      // Update your pagination state here
      pagination.pageIndex = newState.pageIndex;
      pagination.pageSize = newState.pageSize;
    } else {
      // If it's a direct value update
      console.log("Direct page index:", updaterOrValue.pageIndex);
      //      console.log("Direct page size:", updaterOrValue.pageSize);
      // Update your pagination state here
      pagination.pageIndex = updaterOrValue.pageIndex;
      pagination.pageSize = updaterOrValue.pageSize;
    }

    if (pagination.pageIndex % 2 == 0) {
      const data = await fetchData2();
      pagination.totalCount = data.length * 2000;
      console.log("aaa 111=", pagination.totalCount);
      setTableData(data);
    } else {
      const data = await fetchData1();
      pagination.totalCount = data.length;
      console.log("aaa 222=", pagination.totalCount);
      setTableData(data);
    }
  }

  const handleSearch = async () => {
    console.log("22222:");

    if (testPage == 1) {
      const data = await fetchData2();
      pagination.totalCount = data.length;
      setTableData(data);

      setTestPage(2);
    } else {
      const data = await fetchData1();
      pagination.totalCount = data.length;
      setTableData(data);
      setTestPage(1);
    }
    if (!tableRef.current) return;

    const tableState = tableRef.current.getTableState();
    try {
      const queryParams = new URLSearchParams();
      if (tableState.pagination) {
        queryParams.set("page", tableState.pagination.pageIndex.toString());
        queryParams.set("size", tableState.pagination.pageSize.toString());
      }
      console.log(
        "tableState pageIndex :" + tableState.pagination.pageIndex.toString()
      );
      console.log(
        "tableState pageSize :" + tableState.pagination.pageSize.toString()
      );

      const taskArray: Payment[] = tableState.selectRows.rows.map(
        (row) => row.original
      );
      console.log("Selected Rows:");
      taskArray.forEach((task, index) => {
        console.log(`Row ${index + 1}: ID=${task.id}, Title=${task.title}`);
      });
    } catch (error) {
      console.error("Error fetching tasks1111:", error);
    }
  };

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        </div>
        <Button onClick={handleSearch}>검색</Button>
        <DataTable
          ref={tableRef}
          DataTableToolbar={PageDtToolbarPropsToolbar}
          data={tableData}
          columns={columns}
          pagination={pagination}
          onPaginationChange={onPaginationChange}
        />
      </div>
    </>
  );
}
