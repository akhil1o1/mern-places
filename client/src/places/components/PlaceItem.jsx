import React, { useContext, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";
import classes from "./PlaceItem.module.css";

function PlaceItem(props) {
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;

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

  function deleteHandler() {
    console.log("DELETING...");
    setShowConfirmModal(false);
  }

  return (
    <>
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
          <div className={classes["place-item__image"]}>
            <img src={props.image} alt={props.title} />
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
            {isLoggedIn && <>
              <Button to={`/places/${props.id}`}>Edit</Button>
            <Button danger onClick={openConfirmModalHandler}>
              Delete
            </Button>
            </>}
          </div>
        </Card>
      </li>
    </>
  );
}

export default PlaceItem;
