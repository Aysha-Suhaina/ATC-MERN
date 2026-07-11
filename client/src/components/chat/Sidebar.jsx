import SearchBar from "./SearchBar";
import RecentChats from "./RecentChats";
import UserList from "./UserList";

const Sidebar = ({
  selectedUser,
  setSelectedUser,
   onlineUsers,
}) =>  {
  return (
    <div
      style={{
        width: "320px",
        borderRight: "1px solid #ddd",
        padding: "15px",
      }}
    >
      <SearchBar />

      <hr />

      <RecentChats />

      <hr />

      <UserList
  selectedUser={selectedUser}
  setSelectedUser={setSelectedUser}
  
  onlineUsers={onlineUsers}
/>
    </div>
  );
};

export default Sidebar;