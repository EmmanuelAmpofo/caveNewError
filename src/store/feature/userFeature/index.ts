import { CreateSliceOptions, createSlice } from "@reduxjs/toolkit";
import { isUserLoggedIn } from "./UserAsyncThunks";

interface UserSliceInitialState {
  userId: string | null;
  fullName: string | null;
  emailAddress: string | null;
  bearerToken: string | null;
  authToken: string | null;
}

const sliceBody: CreateSliceOptions = {
  name: "user",
  initialState: {
    userId: "",
    fullName: "",
    emailAddress: "",
    bearerToken: "",
    authToken: "",
  } as UserSliceInitialState,
  reducers: {
    addUserDetails(state, { payload }) {
      Object.assign(state, payload);
    },
  },
  extraReducers: {
    builder: (builder) => {
      builder.addCase(isUserLoggedIn.fulfilled, (state, action) => {
        return action.payload;
      });
    },
  },
};

const userSlice = createSlice(sliceBody);

export const { addUserDetails } = userSlice.actions;
export default userSlice.reducer;
