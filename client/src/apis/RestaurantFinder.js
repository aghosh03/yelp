import axios from "axios";

const baseURL = process.env.NODE_ENV ==='production'? "api" : "http://localhost:3001/api"
console.log(baseURL);

export default axios.create({
    baseURL,
})