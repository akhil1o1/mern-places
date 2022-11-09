import React from "react";

import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import classes from './UserList.module.css';

function UserList(props) {

    if(props.items.length===0){
        return <div className="center">
        <Card>
            <h1>No users found.</h1>
        </Card>
        </div>
    };

    return <ul className={classes["users-list"]}>
        {
            props.items.map((user) => (
                <UserItem
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    image={user.image}
                    placeCount={user.places.length}
                />
            ))
        }
    </ul>
}

export default UserList;