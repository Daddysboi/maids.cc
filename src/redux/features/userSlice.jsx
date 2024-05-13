import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetUserById,
  UpdateUserProfile,
  UpdatePassword,
  GetClientById,
  GetMaidById,
  CreateUser,
  GetAllClients,
  GetAllMaids,
  DeleteClient,
  DeleteMaid,
  GetClientRecords,
  GetMaidRecords,
} from "../services/UserServices";

//Get User BY ID
export const getUserById = createAsyncThunk("getUserById", async (userId) => {
  try {
    const resp = await GetUserById(userId);
    console.log(resp);
    return resp;
  } catch (error) {
    throw error;
  }
});

//UPDATE USER PROFILE
export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async (
    { userId, firstName, lastName, phoneNumber, profilePicture },
    { rejectWithValue }
  ) => {
    try {
      const resp = await UpdateUserProfile({
        userId,
        firstName,
        lastName,
        phoneNumber,
        profilePicture,
      });
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// UPDATE PASSWORD
export const updatePassword = createAsyncThunk(
  "updatePassword",
  async ({ userId, oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const resp = await UpdatePassword({ userId, oldPassword, newPassword });
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Get Clients Record
export const getClientsRecord = createAsyncThunk(
  "getClientsRecord",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await GetClientRecords();
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Get Maids Record
export const getMaidsRecord = createAsyncThunk(
  "getMaidsRecord",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await GetMaidRecords();
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getClientDetails = createAsyncThunk(
  "getClientDetails",
  async () => {
    try {
      const resp = await GetClientRecords();
      return resp.data;
    } catch (error) {
      return;
    }
  }
);

export const getMaidDetails = createAsyncThunk("getMaidDetails", async () => {
  try {
    const resp = await GetMaidRecords();
    return resp.data;
  } catch (error) {
    return;
  }
});

//create user
export const createUser = createAsyncThunk(
  "createUser",
  async ({ data, editing }, { rejectWithValue }) => {
    try {
      const resp = await CreateUser({ data, editing });
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Get Client by Id
export const getClientById = createAsyncThunk(
  "getClientById",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await GetClientById(id);
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Get Maid by Id
export const getMaidById = createAsyncThunk(
  "getMaidById",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await GetMaidById(id);
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Get All Clients
export const getAllMaids = createAsyncThunk(
  "getAllMaids",
  async (page, { rejectWithValue }) => {
    try {
      const resp = await GetAllMaids();
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Get All Maids
export const getAllClients = createAsyncThunk(
  "getAllClients",
  async (page, { rejectWithValue }) => {
    try {
      const resp = await GetAllClients(page);
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Delete Client
export const deleteClient = createAsyncThunk(
  "deleteClient",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await DeleteClient(id);
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Delete Maids
export const deleteMaid = createAsyncThunk(
  "deleteMaid",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await DeleteMaid(id);
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: {
    role: "admin",
    firstName: "Davido",
    lastName: "Ajayi",
  },
  users: [],
};

// USER SLICE
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { payload } = action;
      state.user = payload;
    },
    setUsers: (state, action) => {
      const { payload } = action;
      state.users = payload;
    },
  },
  extraReducers: (builder) => {
    //Get user by Id
    builder
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserById.rejected, (state) => {
        state.isLoggedIn = false;
        // state.user = null;
        state.isLoading = false;
      });

    // updateUserProfile actions
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.isLoggedIn = false;
        // state.user = null;
        state.isLoading = false;
      });

    // update password
    builder
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePassword.rejected, (state) => {
        state.isLoggedIn = false;
        state.isLoading = false;
      });

    builder
      .addCase(getMaidDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMaidDetails.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getMaidDetails.rejected, (state) => {
        state.isLoggedIn = false;
        state.isLoading = false;
      });

    //Get Client Details
    builder
      .addCase(getClientDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClientDetails.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getClientDetails.rejected, (state) => {
        state.isLoggedIn = false;
        state.isLoading = false;
      });

    // Create User
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.isLoading = false;
      });

    //Get Client Record by Id
    builder
      .addCase(getClientById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClientById.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getClientById.rejected, (state) => {
        state.isLoggedIn = false;
        state.isLoading = false;
      });

    //Get Maid Record by Id
    builder
      .addCase(getMaidById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMaidById.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getMaidById.rejected, (state) => {
        state.isLoggedIn = false;
        state.isLoading = false;
      });

    //Get All Maids
    builder
      .addCase(getAllMaids.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMaids.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllMaids.rejected, (state) => {
        state.isLoggedIn = false;
        state.isLoading = false;
      });

    //Get All Clients
    builder
      .addCase(getAllClients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllClients.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllClients.rejected, (state) => {
        state.isLoggedIn = false;
        state.isLoading = false;
      });

    //Delete Client
    builder
      .addCase(deleteClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteClient.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteClient.rejected, (state) => {
        state.isLoggedIn = false;
        state.isLoading = false;
      });

    //Delete Maid
    builder
      .addCase(deleteMaid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMaid.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteMaid.rejected, (state) => {
        state.isLoggedIn = false;
        state.isLoading = false;
      });
  },
});

const { actions, reducer } = userSlice;
export const { setUser, setUsers } = actions;

export default reducer;
