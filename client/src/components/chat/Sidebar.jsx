import SearchBar from "./SearchBar";
import RecentChats from "./RecentChats";
import UserList from "./UserList";

const Sidebar = ({
  selectedUser,
  setSelectedUser,
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
/>
    </div>
  );
};

export default Sidebar;