import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  SignupPage,
  EventsPage,
  BestSellingPage,
  ProductsPage,
} from "./Routes.js";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          {/* <Route path="/activation/:activation_token" element={<ActivationPage />}/> */}
          <Route path="/events" element={<EventsPage />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
