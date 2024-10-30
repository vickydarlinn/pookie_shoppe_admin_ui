import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useCreateRestaurantMutation } from "../../../hooks/restaurants/useCreateRestaurantMutate";
import { CreateRestaurant } from "../../../types";

interface CreateUserTableInt {
  onClose: () => void;
}

const CreateRestaurantForm = ({ onClose }: CreateUserTableInt) => {
  const {
    mutate: CreateRestaurantMutate,
    isError,
    isPending,
    error: err,
  } = useCreateRestaurantMutation();

  const [restaurantData, setRestaurantData] = useState<CreateRestaurant>({
    name: "",
    address: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setRestaurantData((prevData) => ({
      ...prevData,
      [name]: name === "restaurant" ? { name: value } : value,
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
    CreateRestaurantMutate(restaurantData, {
      onSuccess: () => {
        onClose();
      },
    });
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
      <h1>Create Restaurant</h1>
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
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default CreateRestaurantForm;
