import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ImgData,
  CardsSliceInitState,
  Company,
  ChartRequestParams,
  ChartFinalInfo,
} from "../../types/types";

const companyImages = [
  {
    ticker: "AAPL",
    logo: "https://seeklogo.com/images/A/apple-icon-logo-26EE948661-seeklogo.com.png",
  },
  {
    ticker: "TSLA",
    logo: "https://cdn.icon-icons.com/icons2/2845/PNG/512/tesla_logo_icon_181279.png",
  },
  {
    ticker: "AMZN",
    logo: "https://www.amanida.com/wp-content/uploads/2018/04/amazon-logo-a-smile-black.png",
  },
  {
    ticker: "META",
    logo: "https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png",
  },
  {
    ticker: "GOOG",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png",
  },
  {
    ticker: "NFLX",
    logo: "https://cdn.hashnode.com/res/hashnode/image/upload/v1647410910018/spTELtuIz.jpeg",
  },
  {
    ticker: "GME",
    logo: "https://www.zonetraderpro.com/wp-content/uploads/2021/02/1eadfde291469bf37b2f53b2fe0b2261.png",
  },
  {
    ticker: "SNDL",
    logo: "https://farmacycdn.s3.amazonaws.com/wp-content/uploads/2020/01/19193716/Sundial2_Logo_1800.png",
  },
  {
    ticker: "BB",
    logo: "https://iconape.com/wp-content/png_logo_vector/blackberry.png",
  },
];

const initialState: CardsSliceInitState = {
  status: "idle",

  entities: [],
  currentCompanyInfo: {},
  chartInfo: {},
};

const proxyURL = "https://cors-anywhere.herokuapp.com/";
const baseUrl = "https://query2.finance.yahoo.com";

export const fetchCompanies = createAsyncThunk(
  "cards/fetchCompanies",
  async () => {
    try {
      const response = await fetch(
        `${proxyURL}${baseUrl}/v6/finance/quote?symbols=AAPL,TSLA,AMZN,META,GOOG,NFLX,GME,SNDL,BB`
      );
      const resJson = await response.json();
      const { quoteResponse } = resJson;
      const { result: companiesArr } = quoteResponse;
      const companiesWithImgsArr: Company = companiesArr.map(
        (company: Company, index: number) => ({
          ...company,
          img: companyImages[index].logo,
        })
      );
      return companiesWithImgsArr;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchCompanyInfo = createAsyncThunk(
  "cards/fetchCompanyInfo",
  async (companySymbol: string | undefined) => {
    try {
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
      const imgData: ImgData | undefined = companyImages.find(
        (obj: ImgData) => Object.values(obj)[0] === companySymbol
      );
      const image: string = imgData!.logo;

      const fullInfo: Company = {
        ...companySpecialInfo,
        ...companyInfo[0],
        img: image,
      };
      return fullInfo;
    } catch (error) {
      console.error(error);
    }
  }
);

const round = (number: number) => {
  return number ? +number.toFixed(2) : null;
};

export const fetchChartInfo = createAsyncThunk(
  "cards/fetchChartInfo",
  async (requestParams: ChartRequestParams) => {
    try {
      const { companySymbol, period, interval } = requestParams;
      const chartInfo = await fetch(
        `${proxyURL}${baseUrl}/v8/finance/chart/${companySymbol}?range=${period}&interval=${interval}`
      );
      const chartInfoJson = await chartInfo.json();
      const { chart } = chartInfoJson;
      const { result: chartData } = chart;
      const { timestamp } = chartData[0];
      const { indicators } = chartData[0];
      const { quote } = indicators;

      const candleStickData = timestamp.map((ts: number, index: number) => ({
        x: new Date(ts * 1000),
        y: [
          quote[0].open[index],
          quote[0].high[index],
          quote[0].low[index],
          quote[0].close[index],
        ].map(round),
      }));
      const finalResult: ChartFinalInfo = { prices: candleStickData };
      return finalResult;
    } catch (error) {
      console.error(error);
    }
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
