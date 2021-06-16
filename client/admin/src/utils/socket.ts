import {io} from "socket.io-client"
import {getCookie} from "./cookie"

const DOMAIN_API =
    process.env.NODE_ENV === "production" ? "https://admin.testinsidebysana.uz" : "http://localhost:8000"
const TOKEN = getCookie("crm_token_access")

const socket = io(DOMAIN_API, {
    auth: {
        token: TOKEN
    }
}).connect()

export default socket
