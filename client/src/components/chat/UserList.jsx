import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getChatUsers } from "../../api/userApi";

const UserList = ({ selectedUser, setSelectedUser, onlineUsers, search }) => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const res = await getChatUsers();

      console.log(res.data);
      setUsers(res.data.users);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to load users");
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
      (user.name || "").toLowerCase().includes(query) ||
      (user.email || "").toLowerCase().includes(query) ||
      (user.role || "").toLowerCase().includes(query) ||
      (user.department?.name || "").toLowerCase().includes(query)
    );
  });

 return (
  <div className="chat-users">
    <h3 className="chat-title">People</h3>

    {filteredUsers.map((user) => {
      const isOnline = onlineUsers.includes(user._id);

      return (
        <div
          key={user._id}
          onClick={() => setSelectedUser(user)}
          className={`chat-user ${
            selectedUser?._id === user._id ? "active" : ""
          }`}
        >
          <div className="chat-user-header">
            <div className="chat-user-info">
              <span
                className={`online-dot ${
                  isOnline ? "online" : "offline"
                }`}
              />

              <span className="chat-user-name">
                {user.name}
              </span>
            </div>
          </div>

          <div className="chat-user-role">
            {user.role}
          </div>

          <div className="chat-user-department">
            {user.department?.name || "No Department"}
          </div>
        </div>
      );
    })}
  </div>
);
};

export default UserList;
