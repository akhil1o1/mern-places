import React from "react";

import { Link } from "react-router-dom";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import classes from "./UserItem.module.css";

function UserItem(props) {
  return (
    <li className={classes["user-item"]}>
      <Card className={classes["user-item__content"]}>
        <Link to={`/${props.id}/places`}>
          <div className={classes["user-item__image"]}>
          {/* image src below will directly fetch image file from the local server, for this to work configure a middleware to handle this route and serve static files on backend. */}
            <Avatar image={`${process.env.REACT_APP_IMAGE_URL}/${props.image}`} alt={props.name} />
          </div>
          <div className={classes["user-item__info"]}>
            <h2>{props.name}</h2>
            <h3>{`${props.placeCount} ${
              props.placeCount === 1 ? "place" : "places"
            }`}</h3>
          </div>
        </Link>
      </Card>
    </li>
  );
}

export default UserItem;
