import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useCreateRestaurantMutation } from "../../../hooks/restaurants/useCreateRestaurantMutate";
import { CreateRestaurant } from "../../../types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <form onSubmit={handleSubmit} className="p-2 h-screen flex flex-col">
      <h1 className="text-center font-bold py-3 text-lg">Create Restaurant</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="flex items-center  gap-4 my-3">
        <Label className="text-nowrap  w-52">Restaurant Name</Label>
        <Input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={restaurantData.name}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center  gap-4 my-3">
        <Label className="text-nowrap  w-52">Address</Label>
        <Input
          type="text"
          name="address"
          placeholder="Address"
          value={restaurantData.address}
          onChange={handleChange}
        />
      </div>

      <div className=" mt-auto flex justify-end gap-3  ">
        <Button
          type="button"
          onClick={onClose}
          className=" text-background bg-foreground  w-1/4"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} className="w-1/4">
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default CreateRestaurantForm;
