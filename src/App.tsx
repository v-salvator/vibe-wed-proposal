import React from "react";
import {
  Hero,
  Story,
  ImageGallery,
  Memories,
  Proposal,
  Contact,
} from "./components";
import "./styles/globals.css";
import "./styles/animations.css";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Hero />
      <Story />
      <ImageGallery />
      <Memories />
      <Proposal />
      <Contact />
    </div>
  );
}

export default App;
