import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";

const Table = ({
  columns,
  dataSource,
  items = 5,
  page = 1,
  total,
  onDelete,
  onEdit,
}: TableProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(page);
  const totalPages = Math.ceil(total / items);

  useEffect(() => {
    if (totalPages) {
      if (currentPage > totalPages) {
        updateSearchParams(totalPages);
        setCurrentPage(totalPages);
      }
    }
  }, [currentPage, totalPages]);

  const updateSearchParams = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    setSearchParams(params);
  };

  useEffect(() => {
    // Only update if the current page or items count is different from the URL
    const currentParamsPage = searchParams.get("page");
    if (currentParamsPage !== String(currentPage)) {
      updateSearchParams(currentPage);
    }
  }, [currentPage]);

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
      <table className="w-full border border-secondary table mt-4 text-sm">
        <thead className="border border-secondary py-1">
          <tr className=" py-1">
            {columns.map((col) => (
              <th key={col.key} className={`px-7 py-2 text-left `}>
                {col.title}
              </th>
            ))}
            <th className="px-7 text-center  ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataSource?.map((item: DataSource) => (
            <tr key={item.key} className="border border-secondary">
              {columns.map((col) => (
                <td key={col.key} className={`px-7 text-left`}>
                  {item[col.dataIndex]}
                </td>
              ))}
              <td className="flex gap-1  justify-around text-center">
                {" "}
                <Button
                  variant={"link"}
                  className="text-foreground"
                  onClick={() => onEdit(String(item.key))}
                >
                  Edit
                </Button>
                <Button
                  variant={"link"}
                  className="text-foreground "
                  onClick={() => onDelete(String(item.key))}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex gap-2 justify-end items-center px-5 py-3">
        <Button
          variant={"outline"}
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <span className="text-sm">
          {currentPage} / {totalPages}
        </span>
        <Button
          variant={"outline"}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
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
  onDelete: (id: string) => void;
  onEdit: (data: string) => void;
}
