import React from "react";

import UserList from "../components/UserList";

function Users() {
  const USERS = [
    {
      id: "u1",
      name: "akhil panwar",
      image:"https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
      places:3,
    },
    {
      id: "u2",
      name: "John dwayne",
      image:"https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
      places:10,
    },
  ];

  return <UserList items={USERS} />;
}

export default Users;
