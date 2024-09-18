import axios from "axios";
import { PortfolioGet, PortfolioPost } from "../Models/Portfolio";
import { handleError } from "../Helpers/ErrorHandler";
import { SERVICE_URL_PROD, SERVICE_URL_LOCAL } from "../Helpers/Constants";

const api =
  (process.env.NODE_ENV == "production"
    ? SERVICE_URL_PROD
    : SERVICE_URL_LOCAL) + "portfolio/";

export const portfolioAddAPI = async (symbol: string) => {
  try {
    const data = await axios.post<PortfolioPost>(api + `?Symbol=${symbol}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const portfolioDeleteAPI = async (symbol: string) => {
  try {
    const data = await axios.delete<PortfolioPost>(api + `?Symbol=${symbol}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const portfolioGetAPI = async () => {
  let trial: number = 1;
  try {
    const data = await axios.get<PortfolioGet[]>(api);
    return data;
  } catch (error) {
    if (trial == 1) {
      trial++;
      portfolioGetAPI();
    }
    handleError(error);
  }
};
