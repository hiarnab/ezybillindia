import React, { useState } from "react";
import "./App.css";
import { store } from "./store";
import { Provider } from "react-redux";
// import OTPVerificationModal from "./components/OTPVerificationModal.jsx";
import background from "./assets/BG.png";
import Routes from "./routes/index";
import AdminRoutes from "./routes/adminindex";
import { AuthProvider } from "./authentication/authContextAdmin";
import { useLocation } from "react-router-dom";

function App() {

  const [scrollProp, setScrollProp] = useState(false);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <div
            style={{
              backgroundImage: `url(${background})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              minHeight: "100vh"
            }}
          >
            {isAdminPath ? (
              <AdminRoutes />
            ) : (
              <Routes scrollProp={scrollProp} setScrollProp={setScrollProp} />
            )}
          </div>
        </AuthProvider>
      </Provider>
    </>
  );
}

export default App;
