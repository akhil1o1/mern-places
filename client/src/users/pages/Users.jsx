import React, { useEffect, useState } from "react";

import UserList from "../components/UserList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const API_BASE = "http://localhost:5000/api/users/";

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE}`);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        setUsers(responseData);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  function errorHandler() {
    setError(null);
  }

  return <>
  {isLoading && <div className="center">
    <LoadingSpinner/>
  </div>}
  <ErrorModal error={error} onClear={errorHandler}/>
  {!isLoading && users.length && <UserList items={users} />}
  </>;
}

export default Users;
