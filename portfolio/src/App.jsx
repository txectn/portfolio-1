import { useSiteSettings } from "./components/useSiteSettings";
import { AuthProvider } from "./components/authprovider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/css/global.css";
import Home from "./pages/home/home";
import Auth from "./pages/auth/auth";
import SiteSettings from "./pages/siteSettings/siteSettings";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Loader from "./components/loader/loader";
import ScrollToTop from "./components/resetScroll";
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
    <>
      <ScrollToTop />
        <Loader />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/auth333444455555" element={<Auth />} />
          <Route path="/site-settings" element={authProvider(<SiteSettings />)} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
        <Footer />
    </>
  )
}

export default App
