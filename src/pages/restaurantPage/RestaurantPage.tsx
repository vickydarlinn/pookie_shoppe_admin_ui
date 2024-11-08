import { useState } from "react";

import { useFetchRestaurantsQuery } from "../../hooks/restaurants/useFetchRestaurantsQuery";
import { useDeleteRestaurantMutate } from "../../hooks/restaurants/useDeleteRestaurantMutate";

import CreateRestaurantForm from "./components/CreateRestaurantForm";
import EditRestaurantForm from "./components/EditRestaurantForm";

import Table from "../../components/table";
import Breadcrumb from "../../components/breadcrumb";
import Drawer from "../../components/drawer";
import { Restaurant } from "../../types";
import { Params } from "../../utils/constants";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RestaurantPage = () => {
  const [searchParams] = useSearchParams();

  const [isCreatingRestaurant, setIsCreatingRestaurant] =
    useState<boolean>(false);
  const [isEditingRestaurant, setIsEditingRestaurant] =
    useState<boolean>(false);
  const [existingRestaurantData, setExistingRestaurantData] =
    useState<Restaurant>();
  const [query, setQuery] = useState("");

  const { data: restaurantsData, isPending } = useFetchRestaurantsQuery({
    q: query,
    items: Params.ITEMS_PER_PAGE,
    page: Number(searchParams.get("page") || 1),
  });
  const { mutate: deleteRestaurantMutate } = useDeleteRestaurantMutate();

  const handleClose = () => {
    setIsCreatingRestaurant(false);
    setIsEditingRestaurant(false);
  };

  const handleEdit = (id: string) => {
    console.log("edit restaurant id >>", id);
    setExistingRestaurantData(() =>
      restaurantsData.data.find(
        (restaurant: Restaurant) => String(restaurant.id) === id
      )
    );
    setIsEditingRestaurant(true);
  };
  const handleDelete = (id: string) => {
    console.log("deleting restaurant >>", id);
    deleteRestaurantMutate(id);
  };

  const tableData = restaurantsData?.data.map((restaurant: Restaurant) => ({
    key: restaurant.id,
    name: restaurant.name,
    address: restaurant.address,
  }));

  if (isPending) {
    return <div>Loading.....</div>;
  }

  return (
    <>
      <Drawer isOpen={isCreatingRestaurant} onClose={handleClose}>
        <CreateRestaurantForm onClose={handleClose} />
      </Drawer>
      <Drawer isOpen={isEditingRestaurant} onClose={handleClose}>
        {existingRestaurantData && (
          <EditRestaurantForm
            existedData={existingRestaurantData}
            onClose={handleClose}
          />
        )}
      </Drawer>
      <Breadcrumb />
      <div className="flex justify-between gap-3">
        <Input
          type="text"
          placeholder="Search Restaurant"
          className="w-1/4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={() => setIsCreatingRestaurant(true)}>
          + Create Restaurant
        </Button>
      </div>
      <Table
        total={restaurantsData.total}
        page={restaurantsData.page}
        items={restaurantsData.items}
        columns={columns}
        dataSource={tableData}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </>
  );
};

export default RestaurantPage;

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
  {
    title: "Address",
    key: "address",
    dataIndex: "address",
  },
];
