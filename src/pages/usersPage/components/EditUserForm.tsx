import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { UpdateUser, User } from "../../../types";
import { useUpdateUserMutation } from "../../../hooks/useUpdateUserMutate";

interface CreateUserTableInt {
  onClose: () => void;
  existedData: User;
}

const CreateUserForm = ({ onClose, existedData }: CreateUserTableInt) => {
  const [userData, setUserData] = useState<UpdateUser>({
    firstName: existedData.firstName,
    lastName: existedData.lastName,
  });
  const {
    mutate: updateUserMutate,
    isPending,
    isError,
    error: err,
  } = useUpdateUserMutation();

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validation before submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { firstName, lastName } = userData;
    if (!firstName || !lastName) {
      setError("Please fill in all required fields.");
      return;
    }

    setError(null);

    updateUserMutate(
      { id: String(existedData.id), userData },
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
      <h1>Update User</h1>
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

      <div className="mt-auto ">
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" disabled={isPending}>
          {isPending ? "Updaing..." : "Update"}
        </button>
      </div>
    </form>
  );
};

export default CreateUserForm;
