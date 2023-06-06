import axios from "axios";

// NODE_ENV = "development"
// NODE_ENV = "production"
// if we are in production, baseurl = /api/v1, else baseURL = http://localhost:3001/api/v1

const baseURL = process.env.NODE_ENV ==='production'? "api/v1/" : "http://localhost:3001/api/v1"

export default axios.create({
    baseURL,
})