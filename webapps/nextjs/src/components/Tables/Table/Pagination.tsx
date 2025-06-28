"use client";
import { useEffect } from "react";
import Chevron_SVG from "@/SVGs/Chevron_SVG";
import SelectInput from "@/Inputs/SelectInput";

type Props = {
  data: any[];
  pinned: boolean;
  tableData: any[];
  currentPage: number;
  searchValue: string;
  postsPerPage: number;
  pinnedTableData: any[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPostsPerPage: React.Dispatch<React.SetStateAction<number>>;
  paginateTable: (currentPage: number, postsPerPage: number) => void;
};
export const paginationOptions: Option[] = [
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 50,
    label: "50",
  },
  {
    value: "all",
    label: "All",
  },
];
const TablePagination: React.FC<Props> = (props: Props) => {
  const {
    data,
    pinned,
    tableData,
    currentPage,
    searchValue,
    postsPerPage,
    paginateTable,
    setCurrentPage,
    setPostsPerPage,
    pinnedTableData,
  } = props;

  useEffect(() => {
    paginateTable(1, postsPerPage);
  }, []);
  return (
    <div className="pagination">
      <div className="gap-5 flex flex-row items-center justify-between">
        {searchValue || postsPerPage === data.length ? (
          <div className="w-full justify-end gap-2 flex flex-row">
            <p>{searchValue ? (pinned ? pinnedTableData.length : tableData.length) : data.length} results</p>
          </div>
        ) : (
          <>
            <div className="posts-per-page justify-end gap-s flex-row items-start">
              <div className="min-w-[100px]">
                <SelectInput
                  className="relative"
                  name="posts-per-page"
                  options={paginationOptions}
                  defaultValue={paginationOptions[0]}
                  onChange={(value: number | "all") => {
                    if (value === "all") value = data.length;
                    setCurrentPage(1);
                    setPostsPerPage(value);
                    paginateTable(1, value);
                  }}
                />
              </div>

              <p className="py-2">posts per page</p>
            </div>

            <div className="page-navigation justify-between gap-m flex-row items-start">
              <div
                className={`arrow ${currentPage <= 1 ? "disabled" : ""}`}
                onClick={() => {
                  var newValue = currentPage - 1;
                  const maxPages = Math.ceil(data.length / postsPerPage);

                  if (newValue < 1) newValue = 1;
                  if (newValue > maxPages) newValue = maxPages;

                  setCurrentPage(newValue);
                  paginateTable(newValue, postsPerPage);
                }}
              >
                <Chevron_SVG direction="left" />
              </div>

              <p>
                {currentPage} / {Math.ceil(data.length / postsPerPage)}
              </p>

              <div
                className={`arrow ${currentPage >= Math.ceil(tableData.length / postsPerPage) ? "disabled" : ""}`}
                onClick={() => {
                  var newValue = currentPage + 1;
                  const maxPages = Math.ceil(data.length / postsPerPage);

                  if (newValue < 1) newValue = 1;
                  if (newValue > maxPages) newValue = maxPages;

                  setCurrentPage(newValue);
                  paginateTable(newValue, postsPerPage);
                }}
              >
                <Chevron_SVG direction="right" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TablePagination;
