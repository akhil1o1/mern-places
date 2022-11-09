import React, { useEffect, useState } from "react";

import UserList from "../components/UserList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

function Users() {
  const [users, setUsers] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const API_BASE = "http://localhost:5000/api/users/";

  useEffect(() => {
    // fetching users
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(API_BASE);
        setUsers(responseData.users);
      } catch (error) {} // error will be handled in useHttpClient hook.
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && users.length && <UserList items={users} />}
    </>
  );
}

export default Users;
