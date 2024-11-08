import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { CreateUser, Restaurant } from "../../../types";
import { Roles } from "../../../utils/constants";
import { useCreateUserMutation } from "../../../hooks/users/useCreateUserMutate";
import { useFetchRestaurantsQuery } from "../../../hooks/restaurants/useFetchRestaurantsQuery";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface CreateUserTableInt {
  onClose: () => void;
}

const CreateUserForm = ({ onClose }: CreateUserTableInt) => {
  const {
    mutate: createUserMutate,
    isError,
    isPending,
    error: err,
  } = useCreateUserMutation();
  const [userData, setUserData] = useState<CreateUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    restaurantId: undefined,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setUserData((prevData) => ({
      ...prevData,
      [name]: name === "restaurantId" ? value : value,
    }));
  };

  const { data: restaurantData } = useFetchRestaurantsQuery({
    page: 1,
    items: 50,
  });
  // Validation before submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { firstName, lastName, email, password, role, restaurantId } =
      userData;
    console.log("restro Id", restaurantId);

    if (!firstName || !lastName || !email || !password || !role) {
      setError("Please fill in all required fields.");
      return;
    }

    if (role === Roles.MANAGER && !restaurantId) {
      setError("Restaurant is required when the role is 'manager'.");
      return;
    }
    setError(null);
    // createUserMutate(userData);
    createUserMutate(userData, {
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
      <h1 className="text-center font-bold py-3 text-lg">Create User</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="flex items-center  gap-4 my-3">
        <Label className="text-nowrap  w-52">First Name:</Label>
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={userData.firstName}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center gap-4 my-3">
        <Label className="text-nowrap w-52">Last Name:</Label>
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={userData.lastName}
          onChange={handleChange}
          className=""
        />
      </div>
      <div className="flex items-center gap-4 my-3">
        <Label className="text-nowrap w-52">Email:</Label>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          className=""
        />
      </div>
      <div className="flex items-center gap-4 my-3">
        <Label className="text-nowrap w-52">Password:</Label>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center gap-4 my-3">
        <Label className="text-nowrap w-52">Role</Label>

        <Select
          onValueChange={(value) =>
            handleChange({
              target: {
                name: "role",
                value,
              },
            } as ChangeEvent<HTMLInputElement>)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(Roles).map(([key, value]) => {
              return (
                <SelectItem key={key} value={value} className="capitalize">
                  {value}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      {userData.role === Roles.MANAGER && (
        <div className="flex items-center gap-4 my-3">
          <Label className="text-nowrap w-52">Restaurant</Label>
          <Select
            onValueChange={(value) =>
              handleChange({
                target: {
                  name: "restaurantId",
                  value,
                },
              } as ChangeEvent<HTMLInputElement>)
            }
            value={userData.restaurantId ?? ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Restaurant" />
            </SelectTrigger>
            <SelectContent>
              {restaurantData?.data?.map((restaurant: Restaurant) => (
                <SelectItem key={restaurant.id} value={String(restaurant.id)}>
                  {restaurant.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

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

export default CreateUserForm;
