import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";

import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

function UserPlaces() {
  const [placesByUser, setPlacesByUser] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { userId } = useParams();
  console.log(userId);

  const API_BASE = "http://localhost:5000/api/places";

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`${API_BASE}/user/${userId}`);
        setPlacesByUser(responseData.places);
      } catch (error) {}
    };

    fetchPlaces();
  }, [sendRequest, userId]);

  return <>
  <ErrorModal error={error} onClear={clearError}/>
  {isLoading && <div className="center">
    <LoadingSpinner />
  </div>}
  {!isLoading && placesByUser && <PlaceList items={placesByUser} />}
  </>;
}

export default UserPlaces;
