import express, { response } from "express";

const router = express.Router();

const PLACES = [
    {
        id:"p1",
        imageUrl:"https://s3.amazonaws.com/images.skyscrapercenter.com/thumbs/27711_500x650.jpg",
        title:"Empire State building p1",
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
        title:"Empire State building p2",
        description:"famous sky scraper",
        address:"20 W 34th St., New York, NY 10001, United States",
        creator:"u2",
        location:{
            lat:"40.7483565",
            lng:"-73.9878531",
        }        
    }
];

router.get("/:placeId", (req, res, next) => {
   const {placeId} = req.params;
   const response = PLACES.find((place) => place.id === placeId);
  console.log("Get request in places-routes");
  res.json(response);
});

export default router;
