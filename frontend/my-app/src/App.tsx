import React from "react";
import "./App.css";
import Cards from "./component/word-cards-display/Cards";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import List from "./component/word-list-display/List";
import axios from "axios";

const res = axios
  .get("http://localhost:5000/")

  .then((res) => console.log("成功"))

  .catch((err) => console.log("err", err));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/">Home</Link> | <Link to="/edit">Edit</Link>
        <Routes>
          <Route path="/" element={<Cards id={0} word={""} answer={""}/>} />
          <Route path="/edit" element={<List />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
