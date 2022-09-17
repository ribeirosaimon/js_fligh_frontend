import axios from "axios";
import {baseUrl} from "../utils/ApiUrl"

export default (axios.create({
    baseURL:baseUrl
}))