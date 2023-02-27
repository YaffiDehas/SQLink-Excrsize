import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import NEWTable from "./pages/NewTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/info" component={NEWTable} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
