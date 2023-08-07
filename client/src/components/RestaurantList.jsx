import React, {useEffect, useContext} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

const RestaurantList = (props) => {

    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    const {allReviews, setAllReviews} = useContext(RestaurantsContext);

    const navigate = useNavigate()

    useEffect(()=>{

        const fetchData = async ()=>{
            try {
            const response = await RestaurantFinder.get("/restaurants");
            setRestaurants(response.data.data.restaurant);
            }catch (err){
                console.log(err)
            }
            const response2 = await RestaurantFinder.get(`/all_reviews`);
            setAllReviews(response2.data.data.allReviews);
        }
        fetchData();

    },[])

    const handleDelete = async (e,id)=>{
        e.stopPropagation();
        try{
            RestaurantFinder.delete(`/restaurants/${id}`)
            setRestaurants(restaurants.filter(restaurant =>{
                return restaurant.id !== id;
            }))
        }catch(err){
            console.log(err)
        }
    }

    const handleUpdate = (e,id)=>{
        e.stopPropagation();
        navigate(`restaurants/${id}/update`)
    }

    const handleRestaurantSelect = (id)=>{
        navigate(`/restaurants/${id}`)
    }

    const renderRating = (restaurant) =>{
        if (!restaurant.count){
            return <p className="text-secondary">0 reviews</p>
        }
        return (<>
            <StarRating rating={restaurant.average_rating}/>
            <p className="text-secondary ml-1">{restaurant.count} reviews</p>
        </>)
    }
  
  return (
    <div className="list-group">
        <table className="table table-striped table-hover">
            <thead>
                <tr className="bg-light">
                    <th scope="col">Restaurant</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {restaurants && restaurants.map(restaurant => {
                    return(
                        <tr key={restaurant.id} onClick = {()=>handleRestaurantSelect(restaurant.id)}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>{renderRating(restaurant)}</td>
                            <td>
                                <button onClick = {(e)=>handleUpdate(e,restaurant.id)} className="btn btn-warning">Update</button>
                            </td>
                            <td>
                                <button onClick = {(e)=>handleDelete(e,restaurant.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList