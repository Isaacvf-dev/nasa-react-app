import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import SideBar from "./components/SideBar";

function App() {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function toggleDisplayModal() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    async function fetchAPIData() {
      const url = getUrlFetch("planetary/apod");

      if (setApiDataFromLocalStorage()) {
        return;
      }

      try {
        const res = await fetch(url);
        const apiData = await res.json();
        setInLocalStorage(apiData);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchAPIData();
  }, []);

  function setInLocalStorage(data) {
    const today = new Date().toDateString();
    const localKey = `NASA-${today}`;
    localStorage.setItem(localKey, JSON.stringify(data));
    setData(data);
  }

  function setApiDataFromLocalStorage() {
    const today = new Date().toDateString();
    const localKey = `NASA-${today}`;
    if (localStorage.getItem(localKey)) {
      const apiData = JSON.parse(localStorage.getItem(localKey));
      setData(apiData);
      return true;
    }

    localStorage.clear();
    return false;
  }

  function getUrlFetch(path) {
    const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
    const BASE_PATH = "https://api.nasa.gov/";
    return BASE_PATH + path + `?api_key=${NASA_KEY}`;
  }

  return (
    <>
      {data ? (
        <Main data={data} />
      ) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && <SideBar data={data} onDisplayModal={toggleDisplayModal} />}
      {data && <Footer data={data} onDisplayModal={toggleDisplayModal} />}
    </>
  );
}

export default App;
