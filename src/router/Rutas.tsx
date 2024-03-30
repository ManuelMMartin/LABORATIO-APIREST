import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { switchRoutes } from "./routes";
import { Header } from "../components/Header";
import { SelectMenu } from "../components/SelectMenu";
import { RickList } from "../components/Rick&Morty/RickList";
import { RickList2 } from "../components/Rick&MortyJsonServer/RickList2";


export const Rutas: React.FC = () => {


  return (<>
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path={switchRoutes.root} element={<SelectMenu />} />
          <Route path={switchRoutes.rick} element={<RickList />} />
          <Route path={switchRoutes.rick2} element={<RickList2 />} />
          <Route path="*" element={<h4>404 Not found</h4>} />
        </Routes>
    </BrowserRouter>
  </>
  );
};