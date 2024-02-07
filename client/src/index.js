import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import reducers from "./reducers/index";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import './index.css';
import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root");
const root = createRoot(container);

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const theme = createTheme();
root.render(
  <GoogleOAuthProvider clientId="872138087810-pa6sko7nc2s6vveg0vg3juaeuoefm68o.apps.googleusercontent.com">
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
  </GoogleOAuthProvider>
);
