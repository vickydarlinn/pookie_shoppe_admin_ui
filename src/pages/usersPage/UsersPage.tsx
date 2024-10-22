import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import Breadcrumb from "../../components/breadcrumb";
import Drawer from "../../components/drawer";
import Table from "../../components/table";

import { useFetchUsersQuery } from "../../hooks/useFetchUsersQuery";
import { useDeleteUserMutate } from "../../hooks/useDeleteUserMutate";

import { User } from "../../types";
import { Params, Roles } from "../../utils/constants";

import EditUserForm from "./components/EditUserForm";
import CreateUserForm from "./components/CreateUserForm";

const UsersPage = () => {
  const [searchParams] = useSearchParams();
  const [isCreatingNewUser, setIsCreatingNewUser] = useState<boolean>(false);
  const [isEditingUser, setIsEditingUser] = useState<boolean>(false);
  const [role, setRole] = useState("");
  const [query, setQuery] = useState("");
  const [existingUserData, setExistingUserData] = useState<User>();

  const { data: usersData, isPending } = useFetchUsersQuery({
    q: query,
    items: Params.ITEMS_PER_PAGE,
    page: Number(searchParams.get("page") || 1),
    role,
  });
  const { mutate: deleteUserMutate } = useDeleteUserMutate();

  const handleClose = () => {
    setIsCreatingNewUser(false);
    setIsEditingUser(false);
  };

  const handleDelete = (id: string) => {
    console.log("deleting", id);
    deleteUserMutate(id);
  };

  const handleEdit = (id: string) => {
    console.log("edit user id >>", id);
    setExistingUserData(() =>
      usersData.data.find((user: User) => String(user.id) === id)
    );
    setIsEditingUser(true);
  };

  const data = usersData.data?.map((user: User) => ({
    role: user.role,
    key: user.id,
    email: user.email,
    fullName: `${user.firstName} ${user.lastName}`,
    restaurantId: user.restaurant?.id ?? "None",
  }));

  if (isPending) {
    return <div>Loading.....</div>;
  }

  return (
    <>
      <Drawer isOpen={isCreatingNewUser} onClose={handleClose}>
        <CreateUserForm onClose={handleClose} />
      </Drawer>
      <Drawer isOpen={isEditingUser} onClose={handleClose}>
        {existingUserData && (
          <EditUserForm onClose={handleClose} existedData={existingUserData} />
        )}
      </Drawer>
      <Breadcrumb />
      <div className="flex justify-between">
        <div>
          <input
            type="text"
            className="border p-2"
            placeholder="Search by email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="border p-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value={Roles.ADMIN}>{Roles.ADMIN}</option>
            <option value={Roles.MANAGER}>{Roles.MANAGER}</option>
            <option value={Roles.CUSTOMER}>{Roles.CUSTOMER}</option>
          </select>
        </div>
        <button onClick={() => setIsCreatingNewUser(true)}>
          + Create User
        </button>
      </div>
      <Table
        total={usersData.total}
        page={usersData.page}
        items={usersData.items}
        columns={columns}
        dataSource={data}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </>
  );
};

export default UsersPage;

const columns = [
  {
    title: "ID",
    key: "key",
    dataIndex: "key",
  },
  {
    title: "Email",
    key: "email",
    dataIndex: "email",
  },
  {
    title: "Full Name",
    key: "fullName",
    dataIndex: "fullName",
  },
  {
    title: "Role",
    key: "role",
    dataIndex: "role",
  },
  {
    title: "Restaurant",
    key: "restaurant",
    dataIndex: "restaurantId",
  },
];
