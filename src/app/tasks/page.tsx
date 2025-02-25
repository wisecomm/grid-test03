"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { columns } from "./components/columns";
import { DataTable, DataTableHandle } from "./components/data-table";
import { Task } from "./data/schema";
import { PageDtToolbarPropsToolbar } from "./page-dt-toolbar";
import { Button } from "@/components/ui/button";
import { fetchData, fetchData2 } from "./data/testdata";

export default function TaskPage() {
  const tableRef = useRef<DataTableHandle>(null);
  const [tableData, setTableData] = useState<Task[]>([]);
  const [testPage, setTestPage] = useState<number>(1);

  useEffect(() => {
    async function loadData() {
      //      const data = await fetchData();
      //      setTableData(data);
    }
    loadData();
  }, []);

  const handleSearch = async () => {
    console.log("22222:");

    if (testPage == 1) {
      const data = await fetchData2();
      setTableData(data);

      setTestPage(2);
    } else {
      const data = await fetchData();
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

      const taskArray: Task[] = tableState.selectRows.rows.map(
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
        />
      </div>
    </>
  );
}
