import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export interface Category {
  id: string;
  name: string;
}

// Define the initial state type
interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// Fetch categories
export const fetchCategories = createAsyncThunk<Category[]>(
  "category/fetchAll",
  async () => {
    const response = await axiosInstance.get("/categories");
    return response.data;
  }
);

// Add a new category
export const addCategory = createAsyncThunk<Category, { name: string }>(
  "category/add",
  async (categoryData) => {
    const response = await axiosInstance.post("/categories", categoryData);
    return response.data;
  }
);

// Update a category
export const updateCategory = createAsyncThunk<
  Category,
  { id: string; updatedData: Partial<Category> }
>("category/update", async ({ id, updatedData }) => {
  const response = await axiosInstance.put(`/categories/${id}`, updatedData);
  return response.data;
});

// Delete a category
export const deleteCategory = createAsyncThunk<string, string>(
  "category/delete",
  async (id) => {
    await axiosInstance.delete(`/categories/${id}`);
    return id; // Return the deleted category ID for state update
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.loading = false;
          state.categories = action.payload;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch categories";
      })
      .addCase(
        addCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.categories.push(action.payload);
        }
      )
      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          const index = state.categories.findIndex(
            (cat) => cat.id === action.payload.id
          );
          if (index !== -1) {
            state.categories[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.categories = state.categories.filter(
            (cat) => cat.id !== action.payload
          );
        }
      );
  },
});

export default categorySlice.reducer;
