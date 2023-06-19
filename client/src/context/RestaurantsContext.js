import React, { useState, createContext } from 'react'

export const RestaurantsContext = createContext(null);

export const RestaurantsContextProvider = ({children}) =>{
    
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const [allReviews, setAllReviews] = useState([]);

    const addRestaurants = (restaurant) =>{
        setRestaurants([...restaurants,restaurant]);
    }

    const globalStates = {
            restaurants, 
            setRestaurants,
            selectedRestaurant,
            setSelectedRestaurant,
            addRestaurants,
            allReviews,
            setAllReviews
        }

    return(
        <RestaurantsContext.Provider value={globalStates}>{children}</RestaurantsContext.Provider>
    )
}