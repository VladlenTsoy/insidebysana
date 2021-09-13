import {io} from "socket.io-client"
import {getCookie} from "./cookie"

const DOMAIN_API =
    process.env.NODE_ENV === "production" ? "https://api.insidebysana.uz" : "http://localhost:9000"
const TOKEN = getCookie("crm_token_access")

const socket = io(DOMAIN_API, {
    auth: {
        token: TOKEN
    }
}).connect()

export default socket
