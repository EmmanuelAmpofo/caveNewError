import { createAsyncThunk } from "@reduxjs/toolkit";
import API, {loginUrl} from "../../../utils/endpoints/endpoint";

export const isUserLoggedIn = createAsyncThunk("user/isUserLoggedIn", async () => {
    const response = await API.get(loginUrl);
    const data = await response.json();
    return data;
});
