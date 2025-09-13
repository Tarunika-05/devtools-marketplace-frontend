import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DevMarket from "./components/landing";
import AuthPage from "./components/Auth";
import UploadSellPage from "./components/Upload";
import PurchasesDownloads from "./components/Downloads";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DevMarket />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/upload" element={<UploadSellPage />} />
        <Route path="/downloads" element={<PurchasesDownloads />} />
      </Routes>
    </Router>
  );
}

export default App;
