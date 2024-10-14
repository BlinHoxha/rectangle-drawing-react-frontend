import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios'; // Make sure you import AxiosError
import { fetchRectangleData, updateRectangleData} from '../services/rectangle-service';

const RectangleComponent: React.FC = () => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [perimeter, setPerimeter] = useState<number>(0);
  const [newWidth, setNewWidth] = useState<number>(0);  // Temporary width state for resizing
  const [newHeight, setNewHeight] = useState<number>(0); // Temporary height state for resizing

  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  // Fetch initial rectangle data from backend when component mounts
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchRectangleData();
        setWidth(data.width);
        setHeight(data.height);
        setPerimeter(data.perimeter);
        setNewWidth(data.width); // Initialize the resize fields
        setNewHeight(data.height); // Initialize the resize fields
      } catch (error) {
        console.error("Failed to fetch rectangle data", error);
      }
    };

    getData();
  }, []);

  // Handle resize and validate the rectangle
  const handleResize = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();  // Prevent default form submission behavior if needed
  
    try {
      let calculatedPerimeter = 2 * (newWidth + newHeight);  // Calculate the new perimeter
      
      // Single call to update the rectangle (with validation on the backend)
      await updateRectangleData({ width: newWidth, height: newHeight, perimeter: calculatedPerimeter });
  
      // If successful, update the UI
      setWidth(newWidth);
      setHeight(newHeight);
      setPerimeter(calculatedPerimeter);
      setValidationMessage("Rectangle updated successfully.");
    } catch (error) {
      // Type assertion to handle AxiosError
      if (error instanceof AxiosError && error.response) {
        // Check if the backend returned the "width exceeds height" validation error
        if (error.response.data === "Validation failed: Width cannot exceed height.") {
          setValidationMessage("Error: Width cannot exceed height.");
        } else {
          setValidationMessage(error.response.data || "Failed to update rectangle.");
        }
      } else {
        setValidationMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <div>
      <h1>Rectangle Drawing App</h1>
      <svg width={width} height={height} style={{ border: '1px solid black' }}>
        <rect width={width} height={height} fill="blue" />
      </svg>
      <div>Width: {width}</div>
      <div>Height: {height}</div>
      <div>Perimeter: {perimeter}</div>
      
      {/* Input fields for resizing the rectangle */}
      <div>
        <label>
          New Width: 
          <input 
            type="number" 
            value={newWidth} 
            onChange={(e) => setNewWidth(Number(e.target.value))} 
          />
        </label>
      </div>
      <div>
        <label>
          New Height: 
          <input 
            type="number" 
            value={newHeight} 
            onChange={(e) => setNewHeight(Number(e.target.value))} 
          />
        </label>
      </div>

      {/* Button to apply the resize */}
      <button onClick={handleResize}>Resize Rectangle</button>
    </div>
  );
};

export default RectangleComponent;
