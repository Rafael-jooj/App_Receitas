import axios from "axios";

// json-server --watch -d 180 --host 192.168.100.91 db.json (rodar fake api)

const api = axios.create({
    baseURL: 'http://192.168.100.91:3000/'
})

export default api;