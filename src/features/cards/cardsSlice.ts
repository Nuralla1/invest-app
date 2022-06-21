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

const apiKey = "candjjiad3i9n9nb222g";
const baseApiUrl = "https://finnhub.io//api/v1";
const configObj = {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

export const fetchSymbols = createAsyncThunk("cards/fetchSymbols", async () => {
  const response = await fetch(
    `${baseApiUrl}/stock/symbol?exchange=US&token=${apiKey}`,
    configObj
  );
  const resJson = await response.json();
  resJson.splice(10);
  const symbolsArr = resJson.map((resInfo: companyWithId) => resInfo.symbol);

  return symbolsArr;
});

export const fetchCompanyProfiles = createAsyncThunk(
  "cards/fetchCompanyProfiles",
  async (symbols: string[]) => {
    const companyProfiles = await Promise.all(
      symbols.map(async (symbol: string) => {
        const resProfile = await fetch(
          `${baseApiUrl}/stock/profile2?symbol=${symbol}&token=${apiKey}`,
          configObj
        );
        const resProfileJson = await resProfile.json();
        return resProfileJson;
      })
    );
    return companyProfiles;
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyProfiles.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.status = "idle";
      })
      .addCase(fetchSymbols.fulfilled, (state, action) => {
        state.status = "idle";
        state.symbols = action.payload;
      });
  },
});

export default cardsSlice.reducer;
