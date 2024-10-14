import React, { useState, useEffect } from 'react';
import Modal from './modal-error/modal';  // Import Modal from its folder
import './rectangle.css';  // Import the Rectangle styles

import { fetchRectangleData, updateRectangleData } from '../../services/rectangle-service';

const RectangleComponent: React.FC = () => {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [perimeter, setPerimeter] = useState<number>(0);
    const [newWidth, setNewWidth] = useState<number>(0);
    const [newHeight, setNewHeight] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
    useEffect(() => {
      const getData = async () => {
        try {
          const data = await fetchRectangleData();
          setWidth(data.width);
          setHeight(data.height);
          setPerimeter(data.perimeter);
          setNewWidth(data.width);
          setNewHeight(data.height);
        } catch (error) {
          console.error("Failed to fetch rectangle data", error);
        }
      };
      getData();
    }, []);
  
    const handleResize = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
  
      try {
        let calculatedPerimeter = 2 * (newWidth + newHeight);
        await updateRectangleData({ width: newWidth, height: newHeight, perimeter: calculatedPerimeter });
        setWidth(newWidth);
        setHeight(newHeight);
        setPerimeter(calculatedPerimeter);
        setErrorMessage(null);  // Clear error if successful
      } catch (error) {
        setErrorMessage("Width cannot exceed height.");
      }
    };
  
    const closeModal = () => setErrorMessage(null);
  
    return (
      <div className="rectangle-container">
        <h4>Rectangle SVG</h4>
        <svg width={width} height={height} className="rectangle-svg">
          <rect width={width} height={height} fill="blue" />
        </svg>
        <div>Width: {width}</div>
        <div>Height: {height}</div>
        <div>Perimeter: {perimeter}</div>
        
        <div className="input-container">
          <label>
            New Width: 
            <input 
              type="number" 
              value={newWidth} 
              onChange={(e) => setNewWidth(Number(e.target.value))} 
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            New Height: 
            <input 
              type="number" 
              value={newHeight} 
              onChange={(e) => setNewHeight(Number(e.target.value))} 
            />
          </label>
        </div>
  
        <button onClick={handleResize}>Resize Rectangle</button>
  
        {errorMessage && <Modal message={errorMessage} onClose={closeModal} />}
      </div>
    );
  };
  
  export default RectangleComponent;