//import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import {Draft} from "../pages/Draft";
import {Create} from "../pages/Create";

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Create/>}/>
          <Route path="/draft" element={<Draft/>}/>
        </Routes>
      </Layout>
    </>
  )
}

export default App
