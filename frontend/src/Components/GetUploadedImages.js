import React, { useState, useEffect } from "react";
import axios from "axios";
import utilobj from "../Utils/Utils";

const GetUploadedImages = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  console.log(`[+]GET DERIVED : `, uploadedImages);

  const fetchUploadedImages = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/get-image`);
      console.log(data.message);
      setUploadedImages(data.message);
    } catch (err) {
      console.error("Error fetching uploaded images:", err.message);
    }
  };
  useEffect(() => {
    // Fetch list of uploaded images from the server
    fetchUploadedImages();
  }, []);
  return (
    <div>
      {uploadedImages.map((data, index) => {
        console.log(utilobj.get_Url() + "/uploads" + data.image);
        return (
          <img key={index} src={utilobj.get_Url() + "/uploads/" + data.image} 
          style={{height:'100px',width:'100px'}}
          />
        );
      })}
    </div>
  );
};

export default GetUploadedImages;
