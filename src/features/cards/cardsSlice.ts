import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const cardsAdapter = createEntityAdapter();

type initState = {
  id?: number[];
  entities?: any;
  status: string;
  symbols: string[];
};

const initialState = cardsAdapter.getInitialState<initState>({
  status: "idle",
  symbols: [],
});

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

export const fetchSymbols = createAsyncThunk(
  "cards/fetchCardsSymbols",
  async () => {
    const response = await fetch(
      `${baseApiUrl}/stock/symbol?exchange=US&token=${apiKey}`,
      configObj
    );
    const resJson = await response.json();
    resJson.splice(10);
    const symbolsArr = resJson.map((resInfo: companyWithId) => resInfo.symbol);

    return symbolsArr;
  }
);

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
        cardsAdapter.setAll(state, action.payload);
        state.status = "idle";
      })
      .addCase(fetchSymbols.fulfilled, (state, action) => {
        state.status = "idle";
        state.symbols = action.payload;
      });
  },
});

export const { selectAll: selectCompanies, selectById: selectCompaniesById } =
  cardsAdapter.getSelectors<any>((state) => state.cards);

export const selectCompanyProfiles = createSelector(selectCompanies, (cards) =>
  cards.map((card) => card)
);

export default cardsSlice.reducer;
