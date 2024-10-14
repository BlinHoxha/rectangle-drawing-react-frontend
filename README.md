Rectangle Drawing React Frontend
This is a React frontend application that allows users to draw and resize a rectangle SVG with real-time validation using a backend API. The application interacts with a .NET Core backend for validation and persistence of the rectangle’s dimensions.

Features
SVG Rectangle Drawing: Dynamically render and display a rectangle SVG based on dimensions.
Resize Functionality: Users can input new dimensions (width and height) to resize the rectangle.
Perimeter Calculation: Automatically calculates and displays the perimeter of the rectangle.
Backend Validation: Ensures the rectangle's width does not exceed its height by sending the data to a backend API for validation.
Error Handling: Shows error messages in a modal when validation fails.
Asynchronous Validation: Allows users to make changes while previous validation is still in progress, imitating long backend processing (10-second delay).
Technologies Used
React (Frontend)
TypeScript for strong typing.
Axios for HTTP requests to interact with the backend API.
CSS for styling.
Setup
Prerequisites
Node.js and npm installed.
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/BlinHoxha/rectangle-drawing-react-frontend.git
Navigate into the project directory:
bash
Copy code
cd rectangle-drawing-react-frontend
Install dependencies:
bash
Copy code
npm install
Running the Application
To run the app in development mode:

bash
Copy code
npm start
The app will be available at http://localhost:3000 in your browser.
