import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { CreateRestaurant, Restaurant } from "../../../types";
import { useUpdateRestaurantMutation } from "../../../hooks/restaurants/useUpdateRestaurantMutate";

interface UpdateUserTableInt {
  onClose: () => void;
  existedData: Restaurant;
}

const EditRestaurantForm = ({ onClose, existedData }: UpdateUserTableInt) => {
  const {
    mutate: updateRestaurantMutate,
    isError,
    isPending,
    error: err,
  } = useUpdateRestaurantMutation();

  const [restaurantData, setRestaurantData] = useState<CreateRestaurant>({
    name: existedData.name,
    address: existedData.address,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setRestaurantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validation before submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, address } = restaurantData;

    if (!name || !address) {
      setError("Please fill in all required fields.");
      return;
    }

    setError(null);
    updateRestaurantMutate(
      { id: "1", restaurantData },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  useEffect(() => {
    if (isError) {
      setError(err.message);
    } else {
      setError(null);
    }
  }, [isError, err]);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Restaurant</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label> Name</label>
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={restaurantData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={restaurantData.address}
          onChange={handleChange}
        />
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Updating..." : "Update"}
      </button>
    </form>
  );
};

export default EditRestaurantForm;
