import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./routes/Home.jsx";
import UpdatePage from "./routes/UpdatePage.jsx";
import RestaurantDetailsPage from "./routes/RestaurantDetailsPage.jsx";
import { RestaurantsContextProvider } from './context/RestaurantsContext.js';


const App = () =>{
    return (
        <RestaurantsContextProvider>
             <div className='container'>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Home />}/>
                        <Route exact path="/restaurants/:id/update" element={<UpdatePage />}/>
                        <Route exact path="/restaurants/:id" element={<RestaurantDetailsPage/>}/>
                    </Routes>
                </Router>
            </div>
        </RestaurantsContextProvider>
        
    ) 
}

export default App;