import axios from 'axios';

// Define the model for rectangle data
interface RectangleData {
  width: number;
  height: number;
  perimeter: number;

}

const API_URL = 'https://localhost:7275/api/Rectangle';

// Fetch rectangle data from backend by appending /get to the API URL
export const fetchRectangleData = async () => {
    const response = await axios.get(`${API_URL}/get`);
    return response.data;
  };

// Service to update rectangle data
export const updateRectangleData = async (rectangle: RectangleData): Promise<void> => {
  await axios.put(`${API_URL}/update`, rectangle);
};


