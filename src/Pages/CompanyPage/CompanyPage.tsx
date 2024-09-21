import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CompanyProfile } from "../../company";
import { getCompanyProfile } from "../../api";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tile from "../../Components/Tile/Tile";
import Spinner from "../../Components/Spinner/Spinner";
import TenKFinder from "../../Components/TenKFinder/TenKFinder";
import { formatRatio } from "../../Helpers/NumberFormatting";
import { CONST_ENV_VAR } from "../../Helpers/Constants";

interface Props {}

const CompanyPage = (props: Props) => {
  const emptyCompanyProfile: CompanyProfile = {
    symbol: "",
    price: 0,
    beta: 0,
    volAvg: 0,
    mktCap: 0,
    lastDiv: 0,
    range: "",
    changes: 0,
    companyName: "",
    currency: "",
    cik: "",
    isin: "",
    exchange: "",
    exchangeShortName: "",
    industry: "",
    website: "",
    description: "",
    ceo: "",
    sector: "",
    counter: "",
    fullTimeEmployees: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    dcfDiff: 0,
    dcf: 0,
    image: "",
    ipoDate: "",
    defaultImage: false,
    isEtf: false,
    isActivelyTrading: false,
    isAdr: false,
    isFund: false,
  };

  let { ticker } = useParams();

  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getProfileInit =
      process.env.NODE_ENV == CONST_ENV_VAR
        ? () => setCompany(emptyCompanyProfile)
        : async () => {
            const result = await getCompanyProfile(ticker!);
            setCompany(result?.data[0]);
          };
    getProfileInit();
  }, []);

  return (
    <>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />
          <CompanyDashboard ticker={ticker!}>
            <Tile title="Company Name" subTitle={company.companyName} />
            <Tile title="Price" subTitle={"$" + company.price.toString()} />
            <Tile title="DCF" subTitle={"$" + formatRatio(company.dcf)} />
            <Tile title="Sector" subTitle={company.sector} />
            <TenKFinder ticker={company.symbol} />
            <p className="bg-white shadow rounded text-medium text-gray-900 p-3 mt-1 m-4">
              {company.description}
            </p>
          </CompanyDashboard>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CompanyPage;
