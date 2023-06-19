require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

//Optional third party middleware that helps with dev reporting..
const morgan = require("morgan");


//Install CORS Middleware
app.use(cors());


//Install middleware to enable responses to parse html body.
app.use(express.json());


//Get all restaurants and reviews
app.get("/api/v1/restaurants", async (req, res)=>{
    try{

        const queryText = "select * from restaurants left join (select restaurant_id, count(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"

        const restaurantsData = await db.query(queryText);

        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurantsData.rows
            }
        });
    } catch (err){
        console.log(err);
    }
});

//Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res)=>{

    try{
        const queryText = "select * from restaurants left join (select restaurant_id, count(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id=$1;"

        const restaurant = await db.query(queryText, [req.params.id]);

        const reviews = await db.query("select * from reviews where restaurant_id=$1", [req.params.id]);
        
        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            }
        });

    } catch(err){
        console.log(err)
    }

})

//Create a restaurant
app.post("/api/v1/restaurants",async (req, res)=>{

    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",[req.body.name, req.body.location, req.body.price_range]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        });
    } catch(err){
        console.log(err)
    }
})


//Update Restaurant
app.put("/api/v1/restaurants/:id", async (req, res)=>{

    try{    
        const result = await db.query("UPDATE restaurants SET name=$1, location=$2, price_range=$3 where id = $4 returning *",[req.body.name, req.body.location, req.body.price_range, req.params.id])
        console.log(result)
        res.status(200).json({
            status: "success",
            data: {
                restaurant: result.rows[0]
            }
        });
    } catch(err){
        console.log(err)
    }

})

//Delete Restaurant
app.delete("/api/v1/restaurants/:id", async (req,res)=>{
    try{    
        const result = await db.query("DELETE from restaurants WHERE id = $1",[req.params.id])
        res.status(200).json({
            status: "success",
            data: {
                restaurant: result.rows
            }
        });
    } catch(err){
        console.log(err)
    }
})



//Add review
app.post("/api/v1/restaurants/:id/addReview", async (req, res)=>{
    
    try{    
        const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) values ($1,$2,$3,$4) returning *;",[req.params.id, req.body.name, req.body.review, req.body.rating])

        console.log(newReview)
        res.status(200).json({
            status: "success",
            data: {
                review: newReview.rows[0]
            }
        });
    } catch(err){
        console.log(err)
    }

})


//Get all reviews
app.get("/api/v1/all_reviews", async (req, res)=>{
    try{
        const results = await db.query("select * from reviews");

        res.status(200).json({
            status: "success",
            data: {
                allReviews: results.rows
            }
        });
    } catch (err){
        console.log(err);
    }
});

const port = process.env.PORT || 3001;

app.listen(port, ()=>{
    console.log(`Server is running and listening on port ${port}`);
});

