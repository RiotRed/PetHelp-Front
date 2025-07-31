import { Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import DashboardGeneral from "./components/DashboardGeneral";
import Header from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/dashboard" element={<DashboardGeneral />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;