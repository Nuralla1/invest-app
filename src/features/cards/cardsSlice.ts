import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const companyImages = [
  {
    ticker: "AAPL",
    logo: "https://prostomac.com/wp-content/uploads/2020/01/Apple-logo-0.jpg",
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
    logo: "https://www.zonetraderpro.com/wp-content/uploads/2021/02/1eadfde291469bf37b2f53b2fe0b2261.png",
  },
  {
    ticker: "SNDL",
    logo: "https://pbs.twimg.com/profile_images/1080594850683138049/J5U-SAmd_400x400.jpg",
  },
  {
    ticker: "BB",
    logo: "https://yablyk.com/wp-content/uploads/2013/02/blackberry-logo.jpg",
  },
];

type initState = {
  entities?: any;
  currentCompanyInfo: any;
  chartInfo: any;
  status: string;
  symbols: string[];
};

const initialState: initState = {
  status: "idle",
  symbols: [],
  entities: [],
  currentCompanyInfo: {},
  chartInfo: {},
};

export type companyWithId = {
  [key: string]: string | number;
  id: number;
  marketCapitalization: number;
  shareOutstanding: number;
};

// const apiKey = "RpN5ZqpEnkRKM9zD0NCflTb06R0lZfFV";
const proxyURL = "https://cors-anywhere.herokuapp.com/";
const baseUrl = "https://query1.finance.yahoo.com";

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

const round = (number: any) => {
  return number ? +number.toFixed(2) : null;
};

export const fetchCompanyInfo = createAsyncThunk(
  "cards/fetchCompanyInfo",
  async (companySymbol: any) => {
    const specialInfo = await fetch(
      `${proxyURL}${baseUrl}/v11/finance/quoteSummary/${companySymbol}?modules=assetProfile`
    );
    const specialInfoJson = await specialInfo.json();
    const { quoteSummary } = specialInfoJson;
    const { result } = quoteSummary;
    const { assetProfile: companySpecialInfo } = result[0];

    const info = await fetch(
      `${proxyURL}${baseUrl}/v6/finance/quote?symbols=${companySymbol}`
    );
    const infoJson = await info.json();
    const { quoteResponse } = infoJson;
    const { result: companyInfo } = quoteResponse;
    const imgData: any = companyImages.find(
      (obj: any) => Object.values(obj)[0] === companySymbol
    );
    const image: any = imgData.logo;

    // series: [{
    //   data: [{
    //     x: new Date(2016, 01, 01),
    //     y: [51.98, 56.29, 51.59, 53.85]
    //   }

    const fullInfo = {
      ...companySpecialInfo,
      ...companyInfo[0],
      img: image,
    };
    return fullInfo;
  }
);

export const fetchChartInfo = createAsyncThunk(
  "cards/fetchChartInfo",
  async (requestData: any) => {
    const { companySymbol, period } = requestData;
    const chartInfo = await fetch(
      `${proxyURL}${baseUrl}/v8/finance/chart/${companySymbol}?range=${period}&interval=1d`
    );
    const chartInfoJson = await chartInfo.json();
    const { chart } = chartInfoJson;
    const { result: chartData } = chart;
    const { timestamp } = chartData[0];
    const { indicators } = chartData[0];
    const { quote } = indicators;

    const candleStickData = timestamp.map((ts: any, index: any) => ({
      x: new Date(ts * 1000),
      y: [
        quote[0].open[index],
        quote[0].high[index],
        quote[0].low[index],
        quote[0].close[index],
      ].map(round),
    }));
    return { prices: candleStickData };
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
      })
      .addCase(fetchChartInfo.fulfilled, (state, action) => {
        state.chartInfo = action.payload;
        state.status = "idle";
      })
      .addCase(fetchChartInfo.pending, (state, action) => {
        state.status = "loading";
      });
  },
});

export default cardsSlice.reducer;
