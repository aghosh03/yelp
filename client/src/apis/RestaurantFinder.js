import axios from "axios";

const baseURL = "http://localhost:3001/api"
console.log(baseURL);

export default axios.create({
    baseURL,
})