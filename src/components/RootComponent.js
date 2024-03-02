// RootComponent.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainSection from './MainSection';
import ImageComponent from './ImageComponent';

function RootComponent() {
  const [imageData, setImageData] = useState(null);

  return (
    <Router>
      <Route exact path="/" render={() => <MainSection setImageData={setImageData} />} />
      <Route path="/image" render={() => <ImageComponent imageData={imageData} />} />
    </Router>
  );
}

export default RootComponent;
