import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import Breadcrumb from "../../components/breadcrumb";
import Table from "../../components/table";

import { Category } from "../../types";
import { Params } from "../../utils/constants";
import { useFetchCategoriesQuery } from "../../hooks/categories/useFetchCategoriesQuery";
import Drawer from "../../components/drawer";
import CreateCategoryForm from "./components/CreateCategoryForm";
import EditCategoryForm from "./components/EditCategoryForm";
import { useDeleteCategoryMutate } from "../../hooks/categories/useDeleteCategoryMutate";

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  const [isCreatingNewCategory, setIsCreatingNewCategory] =
    useState<boolean>(false);
  const [isEditingCategory, setIsEditingCategory] = useState<boolean>(false);
  const [existingCategoryData, setExistingCategoryData] = useState<Category>();

  const {
    data: categoriesData,
    isPending,
    isError,
  } = useFetchCategoriesQuery({
    items: Params.ITEMS_PER_PAGE,
    page: Number(searchParams.get("page") || 1),
  });

  const { mutate: deleteCategoryMutate } = useDeleteCategoryMutate();
  const handleClose = () => {
    setIsCreatingNewCategory(false);
    setIsEditingCategory(false);
  };

  const handleDelete = (id: string) => {
    console.log("deleting", id);
    deleteCategoryMutate(id);
  };

  const handleEdit = (id: string) => {
    console.log("edit category id >>", id);
    setExistingCategoryData(() =>
      categoriesData?.data?.find((category: Category) => category._id === id)
    );
    setIsEditingCategory(true);
  };

  const data = categoriesData?.data?.map((category: Category) => ({
    name: category.name,
    key: category._id,
  }));

  if (isPending) {
    return <div>Loading.....</div>;
  }
  if (isError) {
    return <div>something went wrong</div>;
  }
  return (
    <>
      <Drawer isOpen={isCreatingNewCategory} onClose={handleClose}>
        <CreateCategoryForm onClose={handleClose} />
      </Drawer>

      <Drawer isOpen={isEditingCategory} onClose={handleClose}>
        {existingCategoryData && (
          <EditCategoryForm
            onClose={handleClose}
            existedData={existingCategoryData}
          />
        )}
      </Drawer>
      <Breadcrumb />
      <div className="flex justify-between">
        <div></div>
        <button onClick={() => setIsCreatingNewCategory(true)}>
          + Create Category
        </button>
      </div>
      <Table
        total={categoriesData?.total}
        page={categoriesData?.page}
        items={categoriesData?.items}
        columns={columns}
        dataSource={data}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </>
  );
};

export default CategoryPage;

const columns = [
  {
    title: "ID",
    key: "key",
    dataIndex: "key",
  },
  {
    title: "Name",
    key: "name",
    dataIndex: "name",
  },
];
