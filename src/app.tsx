import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './Header';
import Home from './Routes/Home';
import Search from './Routes/Search';
import Tv from './Routes/Tv';

const App = () => {
    return (
        <BrowserRouter>
            <Header/>            
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="movies/:id" element={< Home />} /> 
                <Route path="tv" element={<Tv />}></Route>
                <Route path="search" element={<Search />}></Route>                
            </Routes>
        </BrowserRouter>
    )
}

export default App;