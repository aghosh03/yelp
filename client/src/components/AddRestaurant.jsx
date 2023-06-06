import React, {useState, useContext} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
    const {addRestaurants} = useContext(RestaurantsContext);

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await RestaurantFinder.post("/restaurants",{
                name,
                location,
                price_range: priceRange
                }
            );
            addRestaurants(response.data.data.restaurant)
            console.log(response)
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className="mb-4">
        <form action="">
            <div className="row p-2">
                <div className="col-5">
                    <input value={name} onChange={e=>setName(e.target.value)} type="text" className="form-control" placeholder="Name"></input>
                </div>
                <div className="col-4">
                    <input value={location} onChange={e=>setLocation(e.target.value)} className="form-control" placeholder="Location"></input>
                </div>
                <div className="col-2">
                    <select value={priceRange} onChange={e=>setPriceRange(e.target.value)} className="form-control" placeholder="Location">
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <div className="col-1">
                    <button onClick={handleSubmit}type="sumbit" className="btn btn-primary">Add</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default AddRestaurant