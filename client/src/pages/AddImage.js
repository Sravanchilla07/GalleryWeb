import React, { useState, useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {
  getAllCategories,
  postNewImage,
} from "../redux/reducers/gallerySlice";
const AddImage = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState();
    const [category, setCategory] = useState();
    const dispatch = useDispatch();
  
    const formdata = new FormData();
    formdata.append("image", file);
    formdata.append("category", category);
    useEffect(() => {
      dispatch(getAllCategories());
    }, [dispatch]);
    const { categories } = useSelector((state) => state.gallery);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(postNewImage(formdata));
  
      navigate("/");
    };
  return (
    <div class="container">
    <div class="row">
        <div align="center">
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="exampleInputEmail">Image:</label>
                    <input 
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    class="form-control"
                    placeholder="Enter email"
                    />
                </div>
                <div class="form-group mt-4">
                    <label for="exampleInputEmail">Category:</label>
                    <select class="form-control custom-select" name="category"
                        onChange={(e)=> setCategory(e.target.value)}>
                        <option value="" selected disabled>
                            Please Select
                        </option>
                        {categories &&
                  categories.map((item) => {
                    return <option value={item._id}>{item.name}</option>;
                  })}
                    </select>
                </div>
                    <button type="submit" class="btn btn-primary mt-4">
                        Upload
                    </button>

            </form>
            <button className="btn btn-primary">Go to Home</button>
        </div>
       
        </div>     
    </div>
  );
};

export default AddImage
