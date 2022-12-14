import "./Assets/Styles//Fonts.css";
import "./Assets/Styles/Reset.css";
import axios from "axios";
import { createGlobalStyle } from "styled-components";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import faviconDark from "./Assets/Icons/faviconDark.png";
import faviconLight from "./Assets/Icons/faviconLight.png";
import Landing from "./Components/Landing";
import Loader from "./Components/Loader";
import ABDistribution from "./Components/Projects/AbDistribution";
import Galleria from "./Components/Projects/Galleria";
import Unkle from "./Components/Projects/Unkle";
import Sunnyside from "./Components/Projects/Sunnyside";
import Muteza from "./Components/Projects/Muteza";
import Projects from "./Components/Projects";
import Nocta from "./Components/Projects/Nocta";
import DecortaKaz from "./Components/Projects/DecorTaKaz";

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    scrollbar-width: none;
    @media screen and (max-width: 1400px) {
      font-size: 58%;
    }
    @media screen and (max-width: 1224px) {
      font-size: 52%;
    }
    @media screen and (max-width: 992px) {
      font-size: 46%;
    }
    @media screen and (max-width: 768px) {
      font-size: 40%;
    }
    @media screen and (max-width: 576px) {
      font-size: 34%;
    }
    @media screen and (max-width: 321px) {
      font-size: 28%;
    }
  } 
  body {
    font-size: 1.6rem;
    transition: background-color 0.5s ease-in-out;
    min-height: 100vh;
    min-height: -webkit-fill-available;
  }
  ::-moz-selection {
    background: #fff6e7;
    text-shadow: none;
  }
  ::selection {
    background: #fff6e7;
    text-shadow: none;
  }
  ::-webkit-scrollbar{
    width: 10px;
    background-color: #FAF7EE;
  }
    
  ::-webkit-scrollbar-thumb{
    background: #D4CEBD;
    border-radius: 15px;
  }
`;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  function fetchPaintingsData() {
    axios
      .get("./Data/Data.json")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchPaintingsData();
  }, []);

  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.getElementsByTagName("head")[0].appendChild(link);
  }
  link.href = darkMode === true ? faviconLight : faviconDark;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  });

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setDarkMode(theme === "true" ? true : false);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <>
      <GlobalStyle darkMode={darkMode} />
      {/* {loading ? <Loader darkMode={darkMode} /> : null} */}
      <Routes>
      <Route path="/" element={<Landing data={data} />} />
        <Route path={`${data[0]?.path}`} element={<DecortaKaz data={data} />} />
        <Route path={`${data[1]?.path}`} element={<Nocta data={data} />} />
        <Route path={`${data[2]?.path}`} element={<Muteza data={data} />} />
        <Route path={`${data[3]?.path}`} element={<Galleria data={data} />} />
        <Route
          path={`${data[4]?.path}`}
          element={<ABDistribution data={data} />}
        />
        <Route path={`${data[5]?.path}`} element={<Unkle data={data} />} />
        <Route path={`${data[6]?.path}`} element={<Sunnyside data={data} />} />
        <Route path="projets" element={<Projects data={data} />} />
      </Routes>
    </>
  );
}

export default App;
