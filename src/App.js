import "./App.css";
import Body from "./Components/Body/Body";
import { Provider } from "react-redux";
import appStore from "./Utils/Store";

function App() {
  return (
    <div className="App">
      <Provider store={appStore}>
        <Body />
      </Provider>
    </div>
  );
}

export default App;
