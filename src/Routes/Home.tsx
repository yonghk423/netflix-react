import React, { useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
const key = process.env.REACT_APP_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3/";

export function makeImagePath(id: string) {
    console.log(id);
  return `https://image.tmdb.org/t/p/original${id}`;
}

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px; 
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface GetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

const Home = () => {
    const [index, setIndex] = useState(0);
    const { data } = useSWR<GetMoviesResult>(`${BASE_PATH}movie/now_playing?api_key=${key}`);
    console.log(data);

    const incraseIndex = () => setIndex((prev) => prev + 1);

    return (
        <Banner
            onClick={incraseIndex}
            bgPhoto={makeImagePath(data?.results[1]?.backdrop_path || "")}
          >
            <Title>{data?.results[1].title}</Title>
            <Overview>{data?.results[1].overview}</Overview>
        </Banner>
    
    )
}

export default Home;