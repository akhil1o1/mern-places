import React from "react";

import PlaceList from "../components/PlaceList";

const PlACES = [
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
    return <PlaceList items={PlACES}/>
}

export default UserPlaces;