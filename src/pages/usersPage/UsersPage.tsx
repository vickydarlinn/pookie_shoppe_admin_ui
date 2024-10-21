import { useState } from "react";
import Breadcrumb from "../../components/breadcrumb";
import Drawer from "../../components/drawer";
import { useFetchUsersQuery } from "../../hooks/useFetchUsersQuery";
import { User } from "../../types";
import CreateUserForm from "./CreateUserForm";
import Table from "../../components/table";
import { useSearchParams } from "react-router-dom";
import { Roles } from "../../utils/constants";

const columns = [
  {
    title: "ID",
    key: "id",
    dataIndex: "id",
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

const UsersPage = () => {
  const [isCreatingNewUser, setIsCreatingNewUser] = useState(false);
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState("");
  const [query, setQuery] = useState("");

  const items = parseInt(searchParams.get("items") || "5", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data: usersData, isPending } = useFetchUsersQuery({
    q: query,
    items,
    page,
    role,
  });

  if (isPending) {
    return <div>Loading.....</div>;
  }

  const handleClose = () => {
    setIsCreatingNewUser(false);
  };

  const data = usersData.data?.map((user: User) => ({
    role: user.role,
    id: user.id,
    key: user.id,
    email: user.email,
    fullName: `${user.firstName} ${user.lastName}`,
    restaurantId: user.restaurant?.id ?? "None",
  }));

  return (
    <>
      <Drawer isOpen={isCreatingNewUser} onClose={handleClose}>
        <CreateUserForm onClose={handleClose} />
      </Drawer>
      <div>
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
        <div></div>
        <Table
          total={usersData.total}
          page={usersData.page}
          items={usersData.items}
          columns={columns}
          dataSource={data}
        />
      </div>
    </>
  );
};

export default UsersPage;
