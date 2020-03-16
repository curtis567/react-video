import React from "react";
import "./App.css";
import { VideoNavBar } from "./components";
import routes from "./routes";
import { renderRoutes } from "react-router-config";
import { createStore } from "redux";
import calculatorApp from "./core/reducer/videosReducer";
import { Provider } from "react-redux";

let store = createStore(calculatorApp);
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <VideoNavBar />
        {renderRoutes(routes)}
      </Provider>
    );
  }
}

export default App;
