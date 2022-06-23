import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './src/Header';
import Home from './src/Routes/Home';
import Search from './src/Routes/Search';
import Tv from './src/Routes/Tv';

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