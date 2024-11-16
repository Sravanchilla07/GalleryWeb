import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllImages,
  deleteImage,
} from "../redux/reducers/gallerySlice";

const DeleteImage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllImages()); // Fetch all images when the component loads
  }, [dispatch]);

  const { images } = useSelector((state) => state.gallery);

  const handleDelete = (e) => {
    e.preventDefault();
    if (selectedImage) {
      dispatch(deleteImage(selectedImage)); // Dispatch the delete action
      navigate("/"); // Navigate to home after deletion
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div align="center">
          <form onSubmit={handleDelete}>
            <div className="form-group">
              <label htmlFor="imageSelect">Select Image to Delete:</label>
              <select
                className="form-control"
                id="imageSelect"
                onChange={(e) => setSelectedImage(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Please Select an Image
                </option>
                {images &&
                  images.map((image) => (
                    <option key={image._id} value={image._id}>
                      {image.name} {/* Display image name or another identifier */}
                    </option>
                  ))}
              </select>
            </div>
            <button type="submit" className="btn btn-danger mt-4">
              Delete Image
            </button>
          </form>
          <button className="btn btn-primary mt-4" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteImage;
