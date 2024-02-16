import React, { useState } from "react";
import axios from "axios";
import GetUploadedImages from "./Components/GetUploadedImages";
import utilobj from "./Utils/Utils";

function App() {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsUploading(true);
      const res = await axios.post(utilobj.url + "/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded:", res.data.filename);
      setIsUploading(false);
    } catch (err) {
      setIsUploading(false);
      console.error("Error uploading file:", err.message);
    }
  };

  return (
    <div>
      <h1>Image Uploader</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {filename && <p>Selected file: {filename}</p>}
      {file && (
        <img
          src={`${utilobj.url}/uploads/${filename}`}
          alt="Uploaded"
          style={{ maxWidth: "300px", marginTop: "20px" }}
        />
      )}
      {isUploading && <h1>Uploading.....</h1>}
      <GetUploadedImages />
    </div>
  );
}

export default App;
