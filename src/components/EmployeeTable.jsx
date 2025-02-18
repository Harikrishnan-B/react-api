import React from "react";
import { useEmployeeData } from "../hooks/useEmployeeData";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import EmployeeTableView from "./Table/EmployeeTableView";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

const EmployeeTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  const tableConfig = {
    page: pageParam,
    length: 10,
    sort_order: "asc",
    sort_by: "name",
  };

  const {
    data = [],
    isLoading,
    error,
    pagination,
  } = useEmployeeData(tableConfig);

  const columns = [
    { accessorKey: "employee_code", header: "Employee Id" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Mobile" },
    {
      id: "designation",
      header: "Designation",
      cell: ({ row }) => row.original.designation?.title || "",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Link
          to={`/employee/${row.original.id}`}
          className="btn btn-primary"
        >
          View Details
        </Link>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      pagination: { pageIndex: pageParam - 1, pageSize: tableConfig.length },
    },
  });

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        Failed to load employees. Please try again.
      </div>
    );
  }

  return (
    <EmployeeTableView
      key={`table-${pageParam}`}
      table={table}
      pagination={pagination}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    />
  );
};

export default EmployeeTable;