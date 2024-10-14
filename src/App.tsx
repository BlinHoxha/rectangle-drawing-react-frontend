import React from 'react';
import './App.css';
import RectangleComponent from './components/rectangle/rectangle';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Rectangle Drawing App</h1>
        <RectangleComponent />  {/* Use the component here */}
      </header>
    </div>
  );
}

export default App;