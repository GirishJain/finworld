import React, { useEffect, useState } from "react";
import { CompanyTenK } from "../../company";
import { getTenK } from "../../api";
import TenKFinderItem from "./TenKFinderItem/TenKFinderItem";
import Spinner from "../Spinner/Spinner";
import { CONST_ENV_VAR } from "../../Helpers/Constants";

type Props = {
  ticker: string;
};

const TenKFinder = ({ ticker }: Props) => {
  const emptyCompanyTenK = [
    {
      symbol: "",
      fillingDate: "",
      acceptedDate: "",
      cik: "",
      type: "",
      link: "",
      finalLink: "",
    },
  ];
  const [companyData, setCompanyData] = useState<CompanyTenK[]>();
  useEffect(() => {
    const getTenKData =
      process.env.NODE_ENV == CONST_ENV_VAR
        ? () => setCompanyData(emptyCompanyTenK)
        : async () => {
            const value = await getTenK(ticker);
            setCompanyData(value!.data);
          };
    getTenKData();
  }, [ticker]);
  return (
    <>
      <div className="inline-flex rounded-md shadow-sm m-4">
        {companyData ? (
          companyData?.slice(0, 5).map((tenK, i) => {
            return <TenKFinderItem key={i} tenK={tenK} />;
          })
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default TenKFinder;
