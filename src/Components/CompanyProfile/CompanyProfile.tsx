import React, { useEffect, useState } from "react";
import { CompanyKeyMetrics } from "../../company";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { getKeyMetrics } from "../../api";
import RatioList from "../RatioList/RatioList";
import Spinner from "../Spinner/Spinner";
import {
  formatLargeNonMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormatting";
import StockComment from "../StockComment/StockComment";
import { CONST_ENV_VAR } from "../../Helpers/Constants";

type Props = {};

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) =>
      formatLargeNonMonetaryNumber(company.marketCapTTM),
    subTitle: "Total value of all a company's shares of stock",
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.currentRatioTTM),
    subTitle:
      "Measures the companies ability to pay short term debt obligations",
  },
  {
    label: "Return On Equity",
    render: (company: CompanyKeyMetrics) => formatRatio(company.roeTTM),
    subTitle:
      "Return on equity is the measure of a company's net income divided by its shareholder's equity",
  },
  {
    label: "Return On Assets",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.returnOnTangibleAssetsTTM),
    subTitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Free Cashflow Per Share",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.freeCashFlowPerShareTTM),
    subTitle:
      "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Book Value Per Share TTM",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.bookValuePerShareTTM),
    subTitle:
      "Book value per share indicates a firm's net asset value (total assets - total liabilities) on per share basis",
  },
  {
    label: "Divdend Yield TTM",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.dividendYieldTTM),
    subTitle: "Shows how much a company pays each year relative to stock price",
  },
  {
    label: "Capex Per Share TTM",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.capexPerShareTTM),
    subTitle:
      "Capex is used by a company to aquire, upgrade, and maintain physical assets",
  },
  {
    label: "Graham Number",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.grahamNumberTTM),
    subTitle:
      "This is the upperbouind of the price range that a defensive investor should pay for a stock",
  },
  {
    label: "PE Ratio",
    render: (company: CompanyKeyMetrics) => formatRatio(company.peRatioTTM),
    subTitle:
      "This is the upperbouind of the price range that a defensive investor should pay for a stock",
  },
];

const emptyCompanyKeyMetrics: CompanyKeyMetrics = {
  revenuePerShareTTM: 0,
  netIncomePerShareTTM: 0,
  operatingCashFlowPerShareTTM: 0,
  freeCashFlowPerShareTTM: 0,
  cashPerShareTTM: 0,
  bookValuePerShareTTM: 0,
  tangibleBookValuePerShareTTM: 0,
  shareholdersEquityPerShareTTM: 0,
  interestDebtPerShareTTM: 0,
  marketCapTTM: 0,
  enterpriseValueTTM: 0,
  peRatioTTM: 0,
  priceToSalesRatioTTM: 0,
  pocfratioTTM: 0,
  pfcfRatioTTM: 0,
  pbRatioTTM: 0,
  ptbRatioTTM: 0,
  evToSalesTTM: 0,
  enterpriseValueOverEBITDATTM: 0,
  evToOperatingCashFlowTTM: 0,
  evToFreeCashFlowTTM: 0,
  earningsYieldTTM: 0,
  freeCashFlowYieldTTM: 0,
  debtToEquityTTM: 0,
  debtToAssetsTTM: 0,
  netDebtToEBITDATTM: 0,
  currentRatioTTM: 0,
  interestCoverageTTM: 0,
  incomeQualityTTM: 0,
  dividendYieldTTM: 0,
  dividendYieldPercentageTTM: 0,
  payoutRatioTTM: 0,
  salesGeneralAndAdministrativeToRevenueTTM: 0,
  researchAndDevelopementToRevenueTTM: 0,
  intangiblesToTotalAssetsTTM: 0,
  capexToOperatingCashFlowTTM: 0,
  capexToRevenueTTM: 0,
  capexToDepreciationTTM: 0,
  stockBasedCompensationToRevenueTTM: 0,
  grahamNumberTTM: 0,
  roicTTM: 0,
  returnOnTangibleAssetsTTM: 0,
  grahamNetNetTTM: 0,
  workingCapitalTTM: 0,
  tangibleAssetValueTTM: 0,
  netCurrentAssetValueTTM: 0,
  investedCapitalTTM: 0,
  averageReceivablesTTM: 0,
  averagePayablesTTM: 0,
  averageInventoryTTM: 0,
  daysSalesOutstandingTTM: 0,
  daysPayablesOutstandingTTM: 0,
  daysOfInventoryOnHandTTM: 0,
  receivablesTurnoverTTM: 0,
  payablesTurnoverTTM: 0,
  inventoryTurnoverTTM: 0,
  roeTTM: 0,
  capexPerShareTTM: 0,
  dividendPerShareTTM: 0,
  debtToMarketCapTTM: 0,
};

const CompanyProfile = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [companyData, setCompanyData] = useState<CompanyKeyMetrics>();
  useEffect(() => {
    const getCompanyKeyMetrics =
      process.env.NODE_ENV == CONST_ENV_VAR
        ? () => setCompanyData(emptyCompanyKeyMetrics)
        : async () => {
            const value = await getKeyMetrics(ticker);
            setCompanyData(value?.data[0]);
          };
    getCompanyKeyMetrics();
  }, []);
  return companyData ? (
    <>
      <RatioList data={companyData} config={tableConfig} />
      <StockComment stockSymbol={ticker} />
    </>
  ) : (
    <Spinner />
  );
};

export default CompanyProfile;
