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

  const requestUrl = `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`;

  useEffect(() => {
    //fetching places uploaded by user.
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(requestUrl);
        setPlacesByUser(responseData.places);
      } catch (error) {}
    };

    fetchPlaces();
  }, [sendRequest, userId, requestUrl]);

  function onDeletingPlaceHandler(deletedPlaceId) {
    // to update placesByUser when a place get deleted
    setPlacesByUser((prev) => {
      return prev.filter((place) => place.id !== deletedPlaceId);
    });
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && placesByUser && (
        <PlaceList items={placesByUser} onDeletingPlaceHandler={onDeletingPlaceHandler}/>
      )}
    </>
  );
}

export default UserPlaces;
