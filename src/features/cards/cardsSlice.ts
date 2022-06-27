import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const companyImages = [
  {
    ticker: "AAPL",
    logo: "https://s3-symbol-logo.tradingview.com/apple--600.png",
  },
  {
    ticker: "TSLA",
    logo: "https://i.pinimg.com/736x/ff/c0/f3/ffc0f3182c18ec063380a32c89a95c3e.jpg",
  },
  {
    ticker: "AMZN",
    logo: "https://www.amanida.com/wp-content/uploads/2018/04/amazon-logo-a-smile-black.png",
  },
  {
    ticker: "META",
    logo: "https://static.vecteezy.com/system/resources/previews/004/263/114/original/meta-logo-meta-by-facebook-icon-editorial-logo-for-social-media-free-vector.jpg",
  },
  {
    ticker: "GOOG",
    logo: "https://thumbs.dreamstime.com/b/new-google-logo-vector-illustration-white-background-editorial-149046989.jpg",
  },
  {
    ticker: "NFLX",
    logo: "https://i.pinimg.com/originals/f6/97/4e/f6974e017d3f6196c4cbe284ee3eaf4e.png",
  },
  {
    ticker: "GME",
    logo: "https://ih1.redbubble.net/image.2128328118.9499/st,small,507x507-pad,600x600,f8f8f8.jpg",
  },
  {
    ticker: "SNDL",
    logo: "https://www.pngitem.com/pimgs/m/459-4598262_sundial-growers-logo-hd-png-download.png",
  },
  {
    ticker: "BB",
    logo: "https://yablyk.com/wp-content/uploads/2013/02/blackberry-logo.jpg",
  },
];

const symbolsYahoo = [
  "AAPL",
  "TSLA",
  "AMZN",
  "META",
  "GOOG",
  "NFLX",
  "GME",
  "SNDL",
  "BB",
];

type initState = {
  entities?: any;
  currentCompanyInfo: any;
  status: string;
  symbols: string[];
};

const initialState: initState = {
  status: "idle",
  symbols: [],
  entities: [],
  currentCompanyInfo: {},
};

export type companyWithId = {
  [key: string]: string | number;
  id: number;
  marketCapitalization: number;
  shareOutstanding: number;
};

// const apiKey = "RpN5ZqpEnkRKM9zD0NCflTb06R0lZfFV";
const proxyURL = "https://cors-anywhere.herokuapp.com/";
const baseUrl = "https://query2.finance.yahoo.com";

export const fetchCompanies = createAsyncThunk(
  "cards/fetchCompanies",
  async () => {
    const response = await fetch(
      `${proxyURL}${baseUrl}/v6/finance/quote?symbols=AAPL,TSLA,AMZN,META,GOOG,NFLX,GME,SNDL,BB`
    );
    const resJson = await response.json();
    const { quoteResponse } = resJson;
    const { result: companiesArr } = quoteResponse;
    const companiesWithImgsArr = companiesArr.map(
      (company: any, index: any) => ({
        ...company,
        img: companyImages[index].logo,
      })
    );
    return companiesWithImgsArr;
  }
);

export const fetchCompanyInfo = createAsyncThunk(
  "cards/fetchCompanyInfo",
  async (symbol: any) => {
    const specialInfo = await fetch(
      `${proxyURL}${baseUrl}/v11/finance/quoteSummary/${symbol}?modules=assetProfile`
    );
    const specialInfoJson = await specialInfo.json();
    const { quoteSummary } = specialInfoJson;
    const { result } = quoteSummary;
    const { assetProfile: companySpecialInfo } = result[0];

    const info = await fetch(
      `${proxyURL}${baseUrl}/v6/finance/quote?symbols=${symbol}`
    );
    const infoJson = await info.json();
    const { quoteResponse } = infoJson;
    const { result: companyInfo } = quoteResponse;

    const imgData: any = companyImages.find(
      (obj: any) => Object.values(obj)[0] === symbol
    );
    console.log(imgData);
    const image: any = imgData.logo;

    const fullInfo = { ...companySpecialInfo, ...companyInfo[0], img: image };
    return fullInfo;
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
      })
      .addCase(fetchCompanyInfo.fulfilled, (state, action) => {
        state.currentCompanyInfo = action.payload;
        state.status = "idle";
      })
      .addCase(fetchCompanyInfo.pending, (state, action) => {
        state.status = "loading";
      });
  },
});

export default cardsSlice.reducer;
