import React from "react";
import { Hero } from "./components/Hero/Hero";
import { Story } from "./components/Story/Story";
import "./styles/globals.css";
import "./styles/animations.css";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Hero />
      <Story />
    </div>
  );
}

export default App;
