import React from "react";
import { CompanyTenK } from "../../../company";
import { Link } from "react-router-dom";

type Props = {
  tenK: CompanyTenK;
};

const TenKFinderItem = ({ tenK }: Props) => {
  const fillingDate = new Date(tenK.fillingDate).getFullYear();
  return (
    <>
      <Link
        reloadDocument
        to={tenK.finalLink}
        type="button"
        className="inline-flex items-center p-3 text-md text-white bg-green-400 rounded-md"
      >
        {" "}
        10K - {tenK.symbol} - {fillingDate}
      </Link>
      &nbsp;
    </>
  );
};

export default TenKFinderItem;
