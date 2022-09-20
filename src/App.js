import './App.css';
import GlobalStyle from "./style/global";
import RoutesApp from "./routes/routes";
import {AuthProvider} from "./context/auth";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <AuthProvider>
            <RoutesApp/>
            <GlobalStyle/>
        </AuthProvider>
    );
}

export default App;
