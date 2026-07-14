import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getChatUsers } from "../../api/userApi";

const UserList  = ({
  selectedUser,
  setSelectedUser,
  onlineUsers,
  search
}) =>{
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const res = await getChatUsers();

      console.log(res.data);
      setUsers(res.data.users);
    } catch (err) {
      toast.error(
        err.response?.data?.msg ||
        "Failed to load users"
      );
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  console.log("ONLINE USERS STATE:", onlineUsers);

  const filteredUsers = users.filter((user) => {
  if (!search.trim()) return true;

  const query = search.toLowerCase();

  return (
    (user.name || "")
      .toLowerCase()
      .includes(query) ||

    (user.email || "")
      .toLowerCase()
      .includes(query) ||

    (user.role || "")
      .toLowerCase()
      .includes(query) ||

    (user.department?.name || "")
      .toLowerCase()
      .includes(query)
  );
});


  return (
  <div>
    <h3>Users</h3>

    {filteredUsers.map((user) => {
  const isOnline =
    onlineUsers.includes(user._id);

  return (
    <div
      key={user._id}
      onClick={() => setSelectedUser(user)}
      style={{
        border: "1px solid #ddd",
        padding: "10px",
        marginBottom: "8px",
        cursor: "pointer",
        backgroundColor:
          selectedUser?._id === user._id
            ? "#eee"
            : "white",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: isOnline
              ? "green"
              : "gray",
            display: "inline-block",
          }}
        />

        <strong>{user.name}</strong>
      </div>

      <small>{user.role}</small>

      <br />

      <small>{user.department?.name}</small>
    </div>
  );
})}
  </div>
);
};

export default UserList;