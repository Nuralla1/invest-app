import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

type initState = {
  entities?: any;
  status: string;
  symbols: string[];
};

const initialState: initState = {
  status: "idle",
  symbols: [],
  entities: [],
};

export type companyWithId = {
  [key: string]: string | number;
  id: number;
  marketCapitalization: number;
  shareOutstanding: number;
};

const apiKey = "RpN5ZqpEnkRKM9zD0NCflTb06R0lZfFV";
const baseUrl = "https://api.polygon.io";
const configObj = {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

// FINNHUB FETCH REQUEST FOR SYMBOLS AND PROFILES, BUT THEY COME ALWAYS IN RANDOM ORDER
// export const fetchSymbols = createAsyncThunk("cards/fetchSymbols", async () => {
//   const response = await fetch(
//     `${baseApiUrl}/stock/symbol?exchange=US&token=${apiKey}`,
//     configObj
//   );
//   const resJson = await response.json();
//   resJson.splice(10);
//   const symbolsArr = resJson.map((resInfo: companyWithId) => resInfo.symbol);

//   return symbolsArr;
// });

// export const fetchCompanyProfiles = createAsyncThunk(
//   "cards/fetchCompanyProfiles",
//   async (symbols: string[]) => {
//     const companyProfiles = await Promise.all(
//       symbols.map(async (symbol: string) => {
//         const resProfile = await fetch(
//           `${baseApiUrl}/stock/profile2?symbol=${symbol}&token=${apiKey}`,
//           configObj
//         );
//         const resProfileJson = await resProfile.json();
//         return resProfileJson;
//       })
//     );
//     return companyProfiles;
//   }
// );

export const fetchCompanies = createAsyncThunk(
  "cards/fetchCompanies",
  async () => {
    const response = await fetch(
      `${baseUrl}/v3/reference/tickers?order=asc&limit=10&apiKey=${apiKey}`
    );
    const resJson = await response.json();
    const { results: companiesArr } = resJson;
    return companiesArr;
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCompanies.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.status = "idle";
    });
  },
});

export default cardsSlice.reducer;
