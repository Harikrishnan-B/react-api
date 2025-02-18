import React from "react";
import { flexRender } from "@tanstack/react-table";

const EmployeeTableView = ({
  table,
  pagination,
  searchParams,
  setSearchParams,
  isValidating,
}) => {
  const totalRecords = pagination?.total || table.getPrePaginationRowModel().rows.length;
  const pageSize = pagination?.per_page || table.getState().pagination.pageSize;
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const totalPages = pagination?.last_page || Math.ceil(totalRecords / pageSize);

  const handlePageChange = (pageNumber) => {
    if (!isValidating) {
      setSearchParams({ page: pageNumber });
    }
  };

  return (
    <div className="container">
      {/* Table Display Section */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={table.getAllColumns().length} className="text-center">
                  {isValidating ? "Loading..." : "No records found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="btn btn-outline-primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isValidating}
        >
          Previous
        </button>

        <nav>
          <ul className="pagination mb-0">
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(i + 1)}
                  disabled={isValidating}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="btn btn-outline-primary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || isValidating}
        >
          Next
        </button>
      </div>

      <div className="text-center mt-3">Page {currentPage} of {totalPages}</div>
    </div>
  );
};

export default EmployeeTableView;
