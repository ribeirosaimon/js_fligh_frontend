import './App.css';
import GlobalStyle from "./style/global";
import RoutesApp from "./routes/routes";
import {AuthProvider} from "./context/auth";

function App() {
  return (
      <AuthProvider>
          <RoutesApp/>
          <GlobalStyle/>
      </AuthProvider>
  );
}

export default App;
