import React from 'react'
import KinstaBackground from './components/KinstaBg'
import { Routes, Route } from "react-router-dom";
import Home from "./Yt";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<KinstaBackground />} />
      <Route path="/product" element={<Home />} />
    </Routes>
    // <div>
    //   <KinstaBackground/>
    // </div>
  )
}

export default App
