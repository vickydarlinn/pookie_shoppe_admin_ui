import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Table = ({
  columns,
  dataSource,
  items = 5,
  page = 1,
  total,
}: TableProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(page);
  const totalPages = Math.ceil(total / items);

  useEffect(() => {
    if (totalPages) {
      if (currentPage > totalPages) {
        updateSearchParams(totalPages, items);
        setCurrentPage(totalPages);
      }
    }
  }, [currentPage, totalPages]);

  const updateSearchParams = (newPage: number, newItems: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    params.set("items", String(newItems));
    setSearchParams(params);
  };

  useEffect(() => {
    // Only update if the current page or items count is different from the URL
    const currentParamsPage = searchParams.get("page");
    const currentParamsItems = searchParams.get("items");
    if (
      currentParamsPage !== String(currentPage) ||
      currentParamsItems !== String(items)
    ) {
      updateSearchParams(currentPage, items);
    }
  }, [currentPage, items]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <table className="w-full border table">
        <thead className="border">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-7 ${
                  col.key === columns[columns.length - 1].key
                    ? "text-right"
                    : "text-left"
                }`}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((item: DataSource) => (
            <tr key={item.key}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-7 ${
                    col.key === columns[columns.length - 1].key
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {item[col.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex gap-2 justify-end px-5 py-3">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-3 py-1 border ${
            currentPage === 1 ? "opacity-50" : ""
          }`}
        >
          Prev
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border ${
            currentPage === totalPages ? "opacity-50" : ""
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Table;

interface DataSource {
  key: string;
  [key: string]: number | string | null | undefined;
}

interface Column {
  title: string;
  key: string;
  dataIndex: string;
}

interface TableProps {
  columns: Column[];
  dataSource: DataSource[];
  items: number;
  page: number;
  total: number;
}
