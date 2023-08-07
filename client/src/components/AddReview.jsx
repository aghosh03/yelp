import React, {useContext, useState, useEffect} from 'react'
import {useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddReview = (props) => {

    const {allReviews, setAllReviews} = useContext(RestaurantsContext)

    const {id} = useParams();
    const [name, setName]= useState("");
    const [reviewText, setReviewText]= useState("");
    const [rating, setRating]= useState(3);
    
    const navigate = useNavigate();

    const handleSubmitReview= async (e)=>{
        
        e.preventDefault();
        try{
            const response = await RestaurantFinder.post(`/restaurants/${id}/addReview`,{
                name,
                review: reviewText,
                rating
            });
            
            setAllReviews([...allReviews,response.data.data.review]);

        }catch(err){
            console.log(err);
        }
    }

    const handleReturnHome = ()=>{
        navigate('/')
    }
    
  return (
    <div className="mb-2">
        <form action="">
            <div className="form-row">
                <div className="form-group col-2 m-3">
                    <label htmlFor="name">Your Name</label>
                    <input value={name} onChange={(e)=>setName(e.target.value)} id="name" placeholder="name" type="text" className="form-control"/>
                </div>
                <div className="form-group col-2 m-3">
                    <label htmlFor="rating">Star Rating</label>
                    <select value={rating} onChange={(e)=>setRating(parseInt(e.target.value))} id="rating" className="form-control">
                        <option disabled>Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </div>
            <div className="form-group m-3">
                <label htmlFor="review">Review</label>
                <textarea value={reviewText} onChange={(e)=>setReviewText(e.target.value)} id="review" cols="30" className="form-control"></textarea>
            </div>
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4 text-center">
                    <button type="submit" onClick={handleSubmitReview} className="btn btn-primary m-1">Add Review</button>
                    <button type="submit" onClick={handleReturnHome} className="btn btn-secondary m-1">Return Home</button>
                </div>
                <div className="col-4"></div>
            </div>
        </form>
    </div>
  )
}

export default AddReview