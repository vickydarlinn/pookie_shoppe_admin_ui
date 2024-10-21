import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { CreateUser, Restaurant } from "../../types";
import { Roles } from "../../utils/constants";
import { useCreateUserMutation } from "../../hooks/useCreateUserMutate";
import { useFetchRestaurantsQuery } from "../../hooks/useFetchRestaurantsQuery";

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

  const { data: restaurantData } = useFetchRestaurantsQuery();
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
    <form onSubmit={handleSubmit}>
      <h1>Create User</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={userData.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={userData.lastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Role</label>
        <select name="role" value={userData.role} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value={Roles.CUSTOMER}>{Roles.CUSTOMER}</option>
          <option value={Roles.MANAGER}>{Roles.MANAGER}</option>
          <option value={Roles.ADMIN}>{Roles.ADMIN}</option>
        </select>
      </div>
      {userData.role === Roles.MANAGER && (
        <select
          name="restaurantId"
          value={userData.restaurantId ?? undefined}
          onChange={handleChange}
        >
          <option value="">Select Restaurant</option>
          {restaurantData?.data?.map((restaurant: Restaurant) => (
            <option key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </option>
          ))}
        </select>
      )}
      <div className="mt-auto ">
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default CreateUserForm;
