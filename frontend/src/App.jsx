import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import GovtSchemes from "./pages/GovtSchemes";
import MarketInsights from "./pages/MarketInsights";
import TaxPlanning from "./pages/TaxPlanning";
import InvestmentIdeas from "./pages/InvestmentIdeas";
//import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/govt-schemes" element={<GovtSchemes />} />
        <Route path="/market-insights" element={<MarketInsights />} />
        <Route path="/tax-planning" element={<TaxPlanning />} />
        <Route path="/investment-ideas" element={<InvestmentIdeas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
