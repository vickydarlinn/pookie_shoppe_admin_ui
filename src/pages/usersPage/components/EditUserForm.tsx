import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { UpdateUser, User } from "../../../types";
import { useUpdateUserMutation } from "../../../hooks/users/useUpdateUserMutate";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CreateUserTableInt {
  onClose: () => void;
  existedData: User;
}

const EditUserForm = ({ onClose, existedData }: CreateUserTableInt) => {
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
    <form onSubmit={handleSubmit} className="p-2 h-screen flex flex-col">
      <h1 className="text-center font-bold py-3 text-lg">Update User</h1>
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
        />
      </div>

      <div className="mt-auto flex justify-end gap-3">
        <Button
          type="button"
          onClick={onClose}
          className=" text-background bg-foreground  w-1/4"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} className="w-1/4">
          {isPending ? "Updaing..." : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default EditUserForm;
