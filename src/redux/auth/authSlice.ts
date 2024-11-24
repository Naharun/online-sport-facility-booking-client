import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Fetch initial state from localStorage
const savedUser = JSON.parse(localStorage.getItem("user") || "null");
const savedToken = localStorage.getItem("token") || null;

export const initialState: AuthState = {
  user: savedUser, // Initialize from localStorage
  token: savedToken, // Initialize from localStorage
  loading: false,
  error: null,
};

// Thunks for register and login
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://sports-facilities-booking.vercel.app/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to register");

      // Save user and token to localStorage
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token", data.accessToken);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData: any, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://sports-facilities-booking.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      // Save user and token to localStorage
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token", data.token);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { data, accessToken } = action.payload;
        state.loading = false;
        state.user = data;
        state.token = accessToken;
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", accessToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { data, token } = action.payload;
        state.loading = false;
        state.user = data;
        state.token = token;
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { logout, setAuthUser } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
