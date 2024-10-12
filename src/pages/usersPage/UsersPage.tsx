import Breadcrumb from "../../components/breadcrumb";
import { useFetchUsersQuery } from "../../hooks/useFetchUsersQuery";
import { User } from "../../types";

const UsersPage = () => {
  const { data: users, isPending } = useFetchUsersQuery();
  if (isPending) {
    return <div>Loading.....</div>;
  }
  const cols = ["Id", "Email", "Full Name", "Role"];
  return (
    <div>
      <Breadcrumb />
      <div className="flex justify-between">
        <h2>Orders</h2>
        <input type="text" className="border" />
        <button>+ Create User</button>
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
          {users.map((userData: User) => (
            <tr key={userData.id}>
              <td className="text-left border w-1/4 px-7">{userData.id}</td>
              <td className=" border w-1/4 px-7">{userData.email}</td>

              <td className=" border w-1/4 px-7">
                {userData.firstName} {userData.lastName}
              </td>
              <td className="border w-1/4 text-right px-7">{userData.role}</td>
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
  );
};

export default UsersPage;
