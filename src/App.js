import './App.css';
import GlobalStyle from "./style/global";
import {ToastContainer} from "react-toastify";
import RoutesApp from "./routes/routes";
import {AuthProvider} from "./context/auth";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";

function App() {
    return (
        <AuthProvider>
            <RoutesApp/>
            <GlobalStyle/>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </AuthProvider>
    );
}

export default App;
