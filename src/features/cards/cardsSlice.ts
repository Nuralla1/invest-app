import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const companyImages = [
  "https://www.perlan.com.pl/uploaded/AppBundleEntityProduct/imageKey/234/agilent-logo.png",
  "https://invest-brands.cdn-tinkoff.ru/US0138721065x640.png",
  "https://play-lh.googleusercontent.com/D7U1Fj7jprmMz9yr2iC16lSRQjt21-DQlShBxjckQd_H_VMGCpCMD2MXour0EMumKZ0",
  "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1494318041/n9qutns2m5obbaqle92g.jpg",
  "https://s3-symbol-logo.tradingview.com/aareal-bank-ag-inhaber-aktien-o-n--600.png",
  "https://www.devenir-rentier.fr/img/logos/xetra/arl.png",
  "https://www.marketbeat.com/logos/goldman-sachs-physical-gold-etf-logo.png?v=20220131080812",
  "https://assets.entrepreneur.com/content/1x1/300/1624390961-logo-ASIA-inc.jpg",
  "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/v1480061320/dnmdnooebhqirhyt2d9u.png",
  "https://www.renaissancecapital.com/logos/AAC.U_logo_fb.jpg",
];

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
    const companiesWithImgsArr = companiesArr.map(
      (company: any, index: any) => ({ ...company, img: companyImages[index] })
    );
    return companiesWithImgsArr;
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.status = "idle";
      })
      .addCase(fetchCompanies.pending, (state, action) => {
        state.status = "loading";
      });
  },
});

export default cardsSlice.reducer;
