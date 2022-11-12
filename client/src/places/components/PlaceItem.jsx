import React, { useContext, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import classes from "./PlaceItem.module.css";

function PlaceItem(props) {
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const authCtx = useContext(AuthContext);
  const { userId } = authCtx;

  function openMapHandler() {
    setShowMap(true);
  }

  function closeMapHandler() {
    setShowMap(false);
  }

  function openConfirmModalHandler() {
    setShowConfirmModal(true);
  }

  function closeConfirmModalHandler() {
    setShowConfirmModal(false);
  }

  const API_BASE = "http://localhost:5000/api/places";

  const deleteHandler = async () => {
    setShowConfirmModal(false);
    // deleting place
    try {
      await sendRequest(`${API_BASE}/${props.id}`, {method : "DELETE"});
      props.onDeletingPlaceHandler(props.id); // to update placesByUser in userPlaces.
    } catch (error) {} // error being handled in UseHttpClient hook.
  };

  return (
    <>
    <ErrorModal error={error} onClear={clearError}/>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass={classes["place-item__modal-content"]}
        footerClass={classes["place-item__modal-actions"]}
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className={classes["map-container"]}>
          <Map coordinates={props.coordinates} />
        </div>
      </Modal>
      <Modal
        header={"Are you sure?"}
        className={classes["place-item__modal-actions"]}
        headerClass={classes["place-item__modal-header"]}
        show={showConfirmModal}
        onCancel={closeConfirmModalHandler}
        footer={
          <>
            <Button inverse onClick={closeConfirmModalHandler}>
              CANCEL
            </Button>
            <Button danger onClick={deleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place ? Please note that it
          can't be undone.
        </p>
      </Modal>
      <li className={classes["place-item"]}>
        <Card className={classes["place-item__content"]}>
        {isLoading && <LoadingSpinner asOverlay/>}
          <div className={classes["place-item__image"]}>
           {/* image src below will directly fetch image file from the local server, for this to work configure a middleware to handle this route and serve static files on backend. */}
            <img src={`http://localhost:5000/${props.image}`} alt={props.title} />
          </div>
          <div className={classes["place-item__info"]}>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className={classes["place-item__actions"]}>
            <Button inverse onClick={openMapHandler}>
              View on map
            </Button>
            {userId === props.creatorId && (
              <>
                <Button to={`/places/${props.id}`}>Edit</Button>
                <Button danger onClick={openConfirmModalHandler}>
                  Delete
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
}

export default PlaceItem;
