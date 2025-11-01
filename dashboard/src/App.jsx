import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AuthWrapper from "./utils/AuthWrapper";
import { GeneralContextProvider } from "./components/GeneralContext"; // ✅ Import provider

function App() {
  return (
    <GeneralContextProvider> {/* ✅ Wrap with provider */}
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AuthWrapper><Home /></AuthWrapper>} />
        </Routes>
      </BrowserRouter>
    </GeneralContextProvider>
  );
}

export default App;

