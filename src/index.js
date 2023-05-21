import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// This line creates a root ReactDOM node using the createRoot method.
// It selects the HTML 
// element with the id 'root' as the target container where the React 
const root = ReactDOM.createRoot(document.getElementById('root'));
// This line renders the React application inside the selected root 
// container. It uses the render method provided by the root object. 
// The JSX code within the parentheses represents the 
// component hierarchy that will be rendered.
root.render(
  // This is a wrapper component provided by React called StrictMode. 
  // It is used to enable strict mode, which performs additional 
  // checks and warnings during development to detect potential 
  // issues and improve the quality of the code.
  <React.StrictMode>
    <App />
    {/* This is the JSX syntax for rendering the App component. 
    It represents the root component of the React application. */}
  </React.StrictMode>
);


// By using StrictMode in the rendering process,
//  React applies additional checks and warnings to the component tree.
//   It helps in identifying potential problems, 
//   such as deprecated features, unsafe lifecycle methods,
//    or unintended side effects. It encourages best practices 
//    and cleaner code by providing useful warnings and suggestions
//     during development.

// Overall, the code initializes the React application, 
// sets up the root container, and renders the App component
//  within a StrictMode wrapper for enhanced development 
//  checks and warnings.