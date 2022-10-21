import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const PLACES = [
    {
        id:"p1",
        imageUrl:"https://s3.amazonaws.com/images.skyscrapercenter.com/thumbs/27711_500x650.jpg",
        title:"Empire State building",
        description:"famous sky scraper",
        address:"20 W 34th St., New York, NY 10001, United States",
        creator:"u1",
        location:{
            lat:"40.7483565",
            lng:"-73.9878531",
        }        
    },
    {
        id:"p2",
        imageUrl:"https://s3.amazonaws.com/images.skyscrapercenter.com/thumbs/27711_500x650.jpg",
        title:"Empire State building",
        description:"famous sky scraper",
        address:"20 W 34th St., New York, NY 10001, United States",
        creator:"u2",
        location:{
            lat:"40.7483565",
            lng:"-73.9878531",
        }        
    }
];

function UserPlaces() {

    const {userId}  = useParams();
    console.log(userId);
    const placesLoadedByUser = PLACES.filter((place) => place.creator=== userId);

    return <PlaceList items={placesLoadedByUser}/>
}

export default UserPlaces;