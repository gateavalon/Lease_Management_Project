import React from "react";
import { Home } from "./pages/Home";
import { AddLease } from "./pages/AddLease";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/add-lease" element={<AddLease />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
