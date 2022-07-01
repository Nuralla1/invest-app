import React from "react";

//profile
export interface ChartConfig {
  options: {
    chart: {
      [key: string]: string | number;
    };
    title: {
      [key: string]: string;
    };
    xaxis: {
      type: "datetime";
    };
    yaxis: {
      tooltip: {
        enabled: boolean;
      };
    };
  };
}

//cardsSlice
export type ImgData = {
  ticker: string;
  logo: string;
};

export type CardsSliceInitState = {
  entities: [] | Company | any;
  currentCompanyInfo: {} | any;
  chartInfo: {} | any;
  status: string;
};

export type Company = {
  [key: string]: string | number;
};
export type CompanyWithImg = {
  [key: string]: string | undefined;
};
export type ChartRequestParams = {
  companySymbol: string | undefined;
  period: string;
  interval: string;
};

export type SingleCandleInfo = {
  x: string;
  y: number[];
};
export type ChartFinalInfo = {
  prices: SingleCandleInfo[];
};

//Profile
export type StoreState = {
  cards: CardsSliceInitState;
};
