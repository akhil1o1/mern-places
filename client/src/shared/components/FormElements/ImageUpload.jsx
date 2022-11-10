import React, { useEffect, useRef, useState } from "react";

import Button from "./Button";
import classes from "./ImageUpload.module.css";

function ImageUpload(props) {
  const [imageFile, setImageFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const imageUploadRef = useRef();

  const avatarImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

  function imageUploadChangeHandler(event) {
    // will execute if a file is choosen
    const { files } = event.target; // event from input type file has a files property that includes all the files selected.
    console.log(files);
    let pickedFile;
    let fileIsValid = isValid;
    if (files && files.length === 1) {
      pickedFile = files[0];
      setImageFile(pickedFile);
      setIsValid(true);
      fileIsValid = true; // to avoid sending old isValid value to props.onInput;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, imageFile, fileIsValid);
  }

  console.log(imageFile);

  useEffect(() => {
   if(!imageFile) { // if image is undefined 
    return;
   }
   // FileReader is a browser api to convert files to readable urls.
   const fileReader = new FileReader();
   fileReader.onload = () => {
    setPreviewUrl(fileReader.result);
   }
   fileReader.readAsDataURL(imageFile);

   //file reader alternative
  //  setPreviewUrl(window.URL.createObjectURL(imageFile)); // read mdn docs 
  },[imageFile])

  function pickImageHandler() {
    imageUploadRef.current.click(); // to open file uploader when button is clicked.
  }

  return (
    <div className={classes["form-control"]}>
      <input
        id={props.id}
        ref={imageUploadRef}
        onChange={imageUploadChangeHandler} // will execute if a file is choosen
        style={{ display: "none" }} // being hidden here
        type="file"
        accept=".jpg,.jpeg,.png" // input type file has a default accept attribute to configure accepted file types
      />
      <div
        className={`${classes["image-upload"]} ${
          props.center && classes.center
        }`}
      >
        <div className={classes["image-upload__preview"]}>
          <img src={previewUrl ? previewUrl : avatarImage} alt="preview" />
        </div>
        {!previewUrl && <p>Please select an image.</p>}
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
}

export default ImageUpload;
