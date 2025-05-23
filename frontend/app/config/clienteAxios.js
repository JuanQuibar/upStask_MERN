import axios from "axios";

const clienteAxios = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_URL_BACKEND}/api`
    //baseURL: "http://localhost:4000/api"
})

export default clienteAxios