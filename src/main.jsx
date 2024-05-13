import React from "react";
import styled from "styled-components";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createContext, useContext, useState } from "react";

import "./index.css";

import App from "./App.jsx";
import { store } from "./redux/store";
import ErrorBoundary from "./ErrorBoundary.jsx";

import { primaryColors } from "./assets/Colors.jsx";

const StyledApp = styled.section`
  background-color: ${primaryColors.DashBoardBackground};
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

export const scrollContext = createContext();
export const useScroll = () => useContext(scrollContext);

const MainApp = () => {
  const [action, setAction] = useState("Sign Up");

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <scrollContext.Provider value={{ action, setAction }}>
            <StyledApp>
              <App />
            </StyledApp>
          </scrollContext.Provider>
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(<MainApp />);
