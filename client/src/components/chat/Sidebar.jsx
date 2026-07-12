import { useState } from "react";
import SearchBar from "./SearchBar";
import RecentChats from "./RecentChats";
import UserList from "./UserList";

const Sidebar = ({
  selectedUser,
  setSelectedUser,
   onlineUsers,
}) =>  {

  const [search, setSearch] = useState("");
  return (
    <div
      style={{
        width: "320px",
        borderRight: "1px solid #ddd",
        padding: "15px",
      }}
    >
      <SearchBar
  search={search}
  setSearch={setSearch}
/>

      <hr />

      <RecentChats />

      <hr />

      <UserList
  selectedUser={selectedUser}
  setSelectedUser={setSelectedUser}
  onlineUsers={onlineUsers}
  search={search}
/>
    </div>
  );
};

export default Sidebar;