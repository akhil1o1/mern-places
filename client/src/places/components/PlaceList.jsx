import React from "react";

import PlaceItem from "./PlaceItem";
import Card from "../../shared/components/UIElements/Card";
import classes from "./PlaceList.module.css";

function PlaceList(props) {
  if (props.items.length === 0) {
    return (
      <div className={`${classes["place-list"]} center`}>
        <Card>
          <h2>No places found. May be create one?</h2>
          <button>Share place</button>
        </Card>
      </div>
    );
  }
  return (
    <ul className={classes["place-list"]}>
      {props.items.map((place) => (
        <PlaceItem 
        key={place.id} 
        id={place.id} 
        image={place.imageUrl} 
        title={place.title}
        description={place.description}
        address={place.address}
        creatorId={place.creator}
        coordinates={place.location}
        />
      ))}
    </ul>
  );
}

export default PlaceList;
