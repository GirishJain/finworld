import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement";
import DesignGuide from "../Pages/DesignGuide/DesignGuide";
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet";
import CashFlowStatement from "../Components/CashFlowStatement/CashFlowStatement";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate replace to="/finworld" /> },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "finworld", element: <HomePage /> },
      { path: "finworld/register", element: <RegisterPage /> },
      { path: "finworld/login", element: <LoginPage /> },
      {
        path: "finworld/search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      { path: "design-guide", element: <DesignGuide /> },
      {
        path: "company/:ticker",
        element: (
          <ProtectedRoute>
            <CompanyPage />
          </ProtectedRoute>
        ),
        children: [
          { path: "company-profile", element: <CompanyProfile /> },
          { path: "income-statement", element: <IncomeStatement /> },
          { path: "balance-sheet", element: <BalanceSheet /> },
          { path: "cashflow-statement", element: <CashFlowStatement /> },
        ],
      },
    ],
  },
]);
