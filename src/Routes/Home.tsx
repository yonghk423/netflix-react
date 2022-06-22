import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
const key = process.env.REACT_APP_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3/";

const Home = () => {
    const { data } = useSWR(`${BASE_PATH}movie/now_playing?api_key=${key}`);
    console.log(data);
    return (
    <h1>Home</h1>
    
    )
}

export default Home;