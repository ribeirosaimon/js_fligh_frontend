import './App.css';
import GlobalStyle from "./style/global";
import RoutesApp from "./routes/routes";
import {AuthProvider} from "./context/auth";
import NavBar from "./navBar/NavBar";

function App() {
  return (
      <AuthProvider>
          <NavBar/>
          <RoutesApp/>
          <GlobalStyle/>
      </AuthProvider>
  );
}

export default App;
