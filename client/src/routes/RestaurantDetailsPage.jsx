import React, {useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
import StarRating from '../components/StarRating';

const RestaurantDetailsPage = (props) => {

  const {id} = useParams();
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);
  const {allReviews, setAllReviews} = useContext(RestaurantsContext);

  useEffect(()=>{

    const fetchData = async ()=>{
      try{
        const response = await RestaurantFinder.get(`/restaurants/${id}`);
        setSelectedRestaurant(response.data.data);

        const response2 = await RestaurantFinder.get(`/all_reviews`);
        setAllReviews(response2.data.data.allReviews);

      } catch(err){
        console.log(err)
      }
    }
    fetchData();
  },[allReviews]);

  return (
    <div className="container">
      <div className="row text-center">
          <h1>{selectedRestaurant && selectedRestaurant.restaurant.name}</h1>
          <h3>{selectedRestaurant && selectedRestaurant.restaurant.location}</h3>
          <div className="text-center">
              <StarRating rating={selectedRestaurant && selectedRestaurant.restaurant.average_rating}/>
              <p className="text-secondary">{selectedRestaurant && selectedRestaurant.restaurant.count} Reviews
              </p>
          </div>
      </div>
      <div>
        {selectedRestaurant && (
          <>
            <div className="mt-3">
              <Reviews reviews={selectedRestaurant.reviews}/>
              <AddReview/>
            </div>
          </>
        )}
      </div>
 
    </div>
  )
}

export default RestaurantDetailsPage