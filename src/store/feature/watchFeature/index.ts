// import {CreateSliceOptions, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import API, {
//   getComponentTypes,
//   getSubComponentTypes,
//   getComponentsWithID,
//   getDetails,
// } from "../../../utils/endpoints/endpoint";
// import { groupDataByComponentType } from "../../../utils/helpers/sortComponent/sortComponent";

// const initialState = {
//   getWatchErrorMessage: "",
//   isLoading: true,
//   watchDetailsData: {},
//   componentType: "",
//   subComponentData: [],
//   componentSubType: [],
//   selectedSubComponentData: {},
//   userSubComponentType: {},
//   showColors: false,
// };

// // export const getWatchDetailsData = createAsyncThunk(
// //   "getWatchDetailsData",
// //   async () => {
// //     const response = await API.get(getDetails);
// //     console.log('response',response);
// //     const { data } = response;

// //     return data;
// //   }
// // );

// // export const getWatchComponentTypes = createAsyncThunk(
// //   "getWatchComponentTypes",
// //   async () => {
// //     const response = await API.get(getComponentTypes);
// //     const { data } = response;

// //     return data;
// //   }
// // );

// // export const getWatchSubComponentTypes = createAsyncThunk(
// //   "getWatchSubComponentTypes",
// //   async () => {
// //     const res = await API.get(getSubComponentTypes);
// //     const { data } = res;

// //     return data;
// //   }
// // );

// // export const getComponentTypesWithId = createAsyncThunk(
// //   "getComponentTypesWithId",
// //   async (id: number) => {
// //     const res = await API.get(`${getComponentsWithID}/${id}`);
// //     const { data } = res;

// //     return data;
// //   }
// // );

// const sliceBody: CreateSliceOptions ={
//   name: "watchSlice",
//   initialState,
//   reducers: {
//     setWatchComponentType: (state, action) => {
//       state.showColors = false;
//       state.componentType = action.payload;
//       state.subComponentData = state.watchDetailsData[action.payload];
//     },

//     getSubComponentTypeData: (state, action) => {
//       state.showColors = true;
//       const selectedComponent = state.subComponentData.filter(
//         (item) => (item.componentSubType = action.payload)
//       );
//       state.componentSubType = selectedComponent;
//       if (!state.userSubComponentType[action.payload]) {
//         state.userSubComponentType[state.componentType] = action.payload;
//       }
//       state.userSubComponentType[state.componentType] = action.payload;
//     },

//     setUserSelectData: (state, action) => {
//       const userSelect = action.payload;
//       if (!state.selectedSubComponentData[state.componentType]) {
//         state.selectedSubComponentData[state.componentType] = userSelect;
//       }
//       state.selectedSubComponentData[state.componentType] = userSelect;
//     },
//     setSelectedCaseType: (state, action) => {
//       state.showColors = true;
//       state.componentSubType = [action.payload];
//     },
//     setWatchDetailsData: (state, action) => {
//       state.watchDetailsData = action.payload;
//     }
//   },

//   // extraReducers: (builder) => {
//   //   builder
//   //     .addCase(getWatchDetailsData.pending, (state) => {
//   //       return {
//   //         ...state,
//   //         isLoading: true,
//   //       };
//   //     })
//   //     .addCase(getWatchDetailsData.fulfilled, (state, action) => {
//   //       console.log('groupedData',action.payload)
//   //       const groupedData = groupDataByComponentType(action.payload);
//   //       console.log('groupedData',groupedData)
//   //       return {
//   //         ...state,
//   //         watchDetailsData: groupedData,
//   //         isLoading: false,
//   //       };
//   //     })
//   //     .addCase(getWatchDetailsData.rejected, (state) => {
//   //       return {
//   //         ...state,
//   //         getWatchErrorMessage: "Failed to get watch data, please try again",
//   //         isLoading: false,
//   //       };
//   //     });
//   // },
// };

// const watchSlice = createSlice(sliceBody);

// export const {
//   setWatchComponentType,
//   getSubComponentTypeData,
//   setUserSelectData,
//   setSelectedCaseType,
//   setWatchDetailsData
// } = watchSlice.actions;

// export default watchSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API, {
  getComponentTypes,
  getSubComponentTypes,
  getComponentsWithID,
  getDetails,
} from "../../../utils/endpoints/endpoint";
import { groupDataByComponentType } from "../../../utils/helpers/sortComponent/sortComponent";

const initialState = {
  getWatchErrorMessage: "",
  isLoading: true,
  watchDetailsData: {},
  componentType: "",
  subComponentData: [],
  componentSubType: [],
  selectedSubComponentData: {},
  userSubComponentType: {},
  showColors: false,
};

export const getWatchDetailsData = createAsyncThunk(
  "getWatchDetailsData",
  async () => {
    const res = await API.get(getDetails);
    const { data } = res;

    return data;
  }
);

export const getWatchComponentTypes = createAsyncThunk(
  "getWatchComponentTypes",
  async () => {
    const res = await API.get(getComponentTypes);
    const { data } = res;

    return data;
  }
);

export const getWatchSubComponentTypes = createAsyncThunk(
  "getWatchSubComponentTypes",
  async () => {
    const res = await API.get(getSubComponentTypes);
    const { data } = res;

    return data;
  }
);

export const getComponentTypesWithId = createAsyncThunk(
  "getComponentTypesWithId",
  async (id: number) => {
    const res = await API.get(`${getComponentsWithID}/${id}`);
    const { data } = res;

    return data;
  }
);

const watchSlice = createSlice({
  name: "watchSlice",
  initialState,
  reducers: {
    setWatchComponentType: (state, action) => {
      state.showColors = false;
      state.componentType = action.payload;
      state.subComponentData = state.watchDetailsData[action.payload];
    },

    getSubComponentTypeData: (state, action) => {
      state.showColors = true;
      const selectedComponent = state.subComponentData.filter(
        (item) => item.componentSubType === action.payload
      );

      state.componentSubType = selectedComponent;

      if (!state.userSubComponentType[state.componentType]) {
        state.userSubComponentType[state.componentType] = action.payload;
      }
      state.userSubComponentType[state.componentType] = action.payload;
    },

    setUserSelectData: (state, action) => {
      const userSelect = action.payload;

      if (!state.selectedSubComponentData[state.componentType]) {
        state.selectedSubComponentData[state.componentType] = userSelect;
      }
      state.selectedSubComponentData[state.componentType] = userSelect;
    },

    setSelectedCaseType: (state, action) => {
      state.showColors = true;
      state.componentSubType = [action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWatchDetailsData.pending, (state) => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(getWatchDetailsData.fulfilled, (state, action) => {
        const groupedData = groupDataByComponentType(action.payload);

        return {
          ...state,
          isLoading: false,
          watchDetailsData: groupedData,
        };
      })
      .addCase(getWatchDetailsData.rejected, (state) => {
        return {
          ...state,
          isLoading: false,
          getWatchErrorMessage: "Failed to get watch data, please try again",
        };
      });
  },
});

export const {
  setWatchComponentType,
  getSubComponentTypeData,
  setUserSelectData,
  setSelectedCaseType,
} = watchSlice.actions;

export default watchSlice.reducer;

