import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialValues = {
  images: [],
  categories: [],
};

export const getAllImages = createAsyncThunk(
  "images/fetchallimages",
  async () => {
    const res = await axios.get("http://localhost:8000/api/v1/get/images");
    return res.data;
  }
);

export const getAllCategories = createAsyncThunk(
  "images/fetchallcategories",
  async () => {
    const res = await axios.get("http://localhost:8000/api/v1/get/categories");
    return res.data;
  }
);

export const postNewCategory = createAsyncThunk(
  "images/postnewcategory",
  async (payload) => {
    const res = await axios.post(
      "http://localhost:8000/api/v1/add/category",
      payload
    );
    return res.data;
  }
);

export const postNewImage = createAsyncThunk(
  "images/postnewimage",
  async (payload) => {
    const res = await axios.post(
      "http://localhost:8000/api/v1/upload/image",
      payload
    );
    return res.data;
  }
);

export const getSingleImage = createAsyncThunk(
  "images/getsingleImageData",
  async (payload) => {
    const res = await axios.get(
      `http://localhost:8000/api/v1/get/singleimage?category=${payload}`
    );
    return res.data;
  }
);
export const deleteImage = createAsyncThunk(
  "images/deleteImage",
  async (imageId) => {
    await axios.delete(`http://localhost:8000/api/v1/delete/image/${imageId}`);
    return imageId; // Return the ID to remove it from the Redux state
  }
);
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId) => {
    await axios.delete(`http://localhost:8000/api/v1/delete/category/${categoryId}`);
    return categoryId; // Return the ID of the deleted category to update the state
  }
);



const gallerySlice = createSlice({
  name: "galleryslice",
  initialState: initialValues,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllImages.fulfilled, (state, action) => {
        state.images = action.payload;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getSingleImage.fulfilled, (state, action) => {
        state.images = action.payload;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.images = state.images.filter((image) => image._id !== action.payload);
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload
        );
      });
  },
});


export default gallerySlice.reducer;