import { useState } from "react";
import Breadcrumb from "../../components/breadcrumb";
import Drawer from "../../components/drawer";
import { useFetchUsersQuery } from "../../hooks/useFetchUsersQuery";
import { User } from "../../types";
import CreateUserForm from "./CreateUserForm";

const UsersPage = () => {
  const [isCreatingNewUser, setIsCreatingNewUser] = useState(false);
  const { data: users, isPending } = useFetchUsersQuery();
  if (isPending) {
    return <div>Loading.....</div>;
  }

  const handleClose = () => {
    setIsCreatingNewUser(false);
  };

  const cols = ["Id", "Email", "Full Name", "Role"];
  return (
    <>
      <Drawer isOpen={isCreatingNewUser} onClose={handleClose}>
        <CreateUserForm onClose={handleClose} />
      </Drawer>
      <div>
        <Breadcrumb />
        <div className="flex justify-between">
          <h2>Orders</h2>
          <input type="text" className="border" />
          <button onClick={() => setIsCreatingNewUser(true)}>
            + Create User
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
            {users?.map((userData: User) => (
              <tr key={userData.id}>
                <td className="text-left border w-1/4 px-7">{userData.id}</td>
                <td className=" border w-1/4 px-7">{userData.email}</td>

                <td className=" border w-1/4 px-7">
                  {userData.firstName} {userData.lastName}
                </td>
                <td className="border w-1/4 text-right px-7">
                  {userData.role}
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

export default UsersPage;
