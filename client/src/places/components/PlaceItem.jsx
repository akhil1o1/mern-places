import React, { useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import classes from "./PlaceItem.module.css";

function PlaceItem(props) {


  const [showMap, setShowMap] = useState(false);

  function openMapHandler() {
    setShowMap(true);
  }

  function closeMapHandler() {
    setShowMap(false);
  }

  return (<>
  <Modal 
  show={showMap}
  onCancel={closeMapHandler}
  header={props.address}
  contentClass={classes["place-item__modal-content"]}
  footerClass={classes["place-item__modal-actions"]}
  footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
  >
  <div className={classes["map-container"]}>
      <Map coordinates={props.coordinates}/>
  </div>
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
          <Button inverse onClick={openMapHandler}>View on map</Button>
          <Button to={`/places/${props.id}`}>Edit</Button>
          <Button danger>Delete</Button>
        </div>
      </Card>
    </li>
    </>);
}

export default PlaceItem;
