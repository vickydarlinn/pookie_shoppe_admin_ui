import { useState } from "react";
import Breadcrumb from "../../components/breadcrumb";
import Drawer from "../../components/drawer";
import CreateRestaurantForm from "./components/CreateRestaurantForm";
import { useFetchRestaurantsQuery } from "../../hooks/useFetchRestaurantsQuery";
import { Restaurant } from "../../types";

const RestaurantPage = () => {
  const [isCreatingRestaurant, setIsCreatingRestaurant] = useState(false);
  const { data: restaurantsData, isPending } = useFetchRestaurantsQuery();
  if (isPending) {
    return <div>Loading.....</div>;
  }

  const handleClose = () => {
    setIsCreatingRestaurant(false);
  };

  const cols = ["Id", "Name", "Address"];
  return (
    <>
      <Drawer isOpen={isCreatingRestaurant} onClose={handleClose}>
        <CreateRestaurantForm onClose={handleClose} />
      </Drawer>
      <div>
        <Breadcrumb />
        <div className="flex justify-between">
          <h2>Orders</h2>
          <input type="text" className="border" />
          <button onClick={() => setIsCreatingRestaurant(true)}>
            + Create Restaurant
          </button>
        </div>
        <table className="w-full border table ">
          <thead className="border ">
            <tr>
              {cols.map((el, i) => (
                <th
                  key={el}
                  className={`px-7 ${
                    i == cols.length - 1 ? "text-right" : "text-left"
                  }`}
                >
                  {el}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {restaurantsData?.data?.map((restaurantData: Restaurant) => (
              <tr key={restaurantData.id}>
                <td className="text-left border w-1/4 px-7">
                  {restaurantData.id}
                </td>
                <td className=" border w-1/4 px-7">{restaurantData.name}</td>

                <td className="border w-1/4 text-right px-7">
                  {restaurantData.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-1 justify-end px-5">
          <span>Prev</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>Next</span>
        </div>
      </div>
    </>
  );
};

export default RestaurantPage;
