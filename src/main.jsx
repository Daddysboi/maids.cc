import React from "react";
import styled from "styled-components";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <StyledApp>
          <App />
        </StyledApp>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
