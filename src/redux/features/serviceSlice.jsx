import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AssignMaid,
  DeleteAllServices,
  GetAllServices,
  GetMaidServices,
  CreateEditService,
} from "../services/serviceServices";

//Get All Services
export const getAllServices = createAsyncThunk(
  "getAllServices",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await GetAllServices();
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Get Maid Services
export const getMaidServices = createAsyncThunk(
  "getMaidServices",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await GetMaidServices(id);
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Assign Maid
export const assignMaid = createAsyncThunk(
  "assignMaid",
  async (data, { rejectWithValue }) => {
    try {
      const resp = await AssignMaid(data);
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Create/Edit Service
export const createEditService = createAsyncThunk(
  "createEditService",
  async (data, editing, { rejectWithValue }) => {
    try {
      const resp = await CreateEditService(data, editing);
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Delete All Services
export const deleteAllServices = createAsyncThunk(
  "deleteAllServices",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await DeleteAllServices();
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  service: {},
  services: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// Course SLICE
export const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Get All Services
    builder
      .addCase(getAllServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllServices.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getAllServices.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      });

    // Get Maid Services
    builder
      .addCase(getMaidServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMaidServices.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getMaidServices.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      });

    // Assign Maid
    builder
      .addCase(assignMaid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(assignMaid.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(assignMaid.rejected, (state) => {
        state.isLoggedIn = false;
        // state.user = null;
        state.isLoading = false;
        state.isSuccess = false;
      });

    // Create/Edit Service
    builder
      .addCase(createEditService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEditService.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(createEditService.rejected, (state) => {
        state.isLoggedIn = false;
        // state.user = null;
        state.isLoading = false;
        state.isSuccess = false;
      });

    // Delete All Services
    builder
      .addCase(deleteAllServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllServices.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(deleteAllServices.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

const { reducer } = serviceSlice;

export default reducer;
