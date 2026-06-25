import { useSiteSettings } from "./components/useSiteSettings";
import { AuthProvider } from "./components/authprovider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/css/global.css";
import Home from "./pages/home/home";
import Auth from "./pages/auth/auth";
import SiteSettings from "./pages/siteSettings/siteSettings";
function App() {
  useSiteSettings();

  const authProvider = (element) => {
    return (
      <AuthProvider>
        {element}
      </AuthProvider>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth333444455555" element={<Auth />} />
        <Route path="/site-settings" element={authProvider(<SiteSettings />)} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
