import React, {useState, useContext, useEffect} from 'react'
import {useParams} from 'react-router';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useNavigate } from 'react-router';

const UpdateRestaurant = (props) => {

    let navigate = useNavigate();

    const {id} = useParams();
    const {restaurants} = useContext(RestaurantsContext);
    
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

    useEffect(()=>{
        const fetchData = async()=>{
            const response = await RestaurantFinder.get(`/restaurants/${id}`);
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range);
        }
        fetchData();
    },[])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const updateRestaurant = await RestaurantFinder.put(`/restaurants/${id}`,{
            name,
            location,
            price_range: priceRange
        });

        navigate(`/`)

    }

  return (
    <div className="container">
        <div className="row">
            <div className="col-4"></div>
            <div className="col-4">
            <div className="form-list">
            <form action="">
                <div className='form-group mb-3'>
                    <label htmlFor="name">Name</label>
                    <input 
                        value={name} 
                        onChange={e=>setName(e.target.value)} 
                        id="name" 
                        className="form-control" 
                        type="text"
                    />
                </div>

                <div className='form-group mb-3'>
                    <label htmlFor="location">Location</label>
                    <input 
                        value={location} 
                        onChange={e=>setLocation(e.target.value)} 
                        id="location" 
                        className="form-control" 
                        type="text"
                    />
                </div>

                <div className='form-group mb-3'>
                    <label htmlFor="price_range">Price Range</label>
                    <select 
                        value={priceRange} 
                        onChange={e=>setPriceRange(e.target.value)} 
                        id="price_range" 
                        className="form-control mb-3">
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                        <div className="text-center">
                            <button onClick = {handleSubmit} className="btn btn-primary" type="submit">Update</button>
                        </div>
                </div>
                <div className="col-4"></div>
            </form>
            </div>
            </div>
            <div className="col-4"></div>
        </div>
    </div>
    
  )
}

export default UpdateRestaurant