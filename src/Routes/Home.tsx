import React, { useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { motion, AnimatePresence } from "framer-motion";
const key = process.env.REACT_APP_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3/";

export function makeImagePath(id: string) {
    console.log(id);
  return `https://image.tmdb.org/t/p/original${id}`;
}

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px; 
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
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

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween",
    },
  },
};

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

const offset = 6;

const Home = () => {
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const { data } = useSWR<GetMoviesResult>(`${BASE_PATH}movie/now_playing?api_key=${key}`);
    console.log(data);

    const incraseIndex = () => {
    if (data) {
        if (leaving) return;
        toggleLeaving();
        const totalMovies = data.results.length; // 영화 총 개수 
        console.log(totalMovies);
        const maxIndex = Math.floor(totalMovies / offset) -1; 
        console.log(maxIndex);
        /*총 페이지수 한 페이지에 영화를 6편씩 보여준다. 
        따라서 영화 총 개수 ex) 18개  / offset = 6개를 나누면 
        3페이지를 사용하는 것 */    
        setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        /* 
        prev는 const [index, setIndex] = useState(0);의 초기 값은 0으로 시작한다 
        삼항 연산자를 통해 maxIndex 값 즉 총 페이지 개수와 prev와 같다는 것은 페이지를 끝까지 넘겼다는 뜻으로 
        첫페이지 값인 index 값 0을 줌으로서 상태를 변경함에 따라 다시 맨처음 페이지로 가게 된다.
        그리고 앞 조건이 아니라면 페이지수를 넘기며 뒤에 남은 영화 목록을 보여주도록 한다.
        */
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);

    return (
        <>
        <Banner
            onClick={incraseIndex}
            bgphoto={makeImagePath(data?.results[0]?.backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
        </Banner>
        <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results                  
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      bgphoto={makeImagePath(movie.backdrop_path)}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      transition={{ type: "tween" }}
                    />
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          </>    
    )
}

export default Home;