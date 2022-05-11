import axios from "axios"
import {message} from "admin/lib/ui"
import {getCookie, removeCookie, setCookie} from "./cookie"

const CancelToken = axios.CancelToken
const DOMAIN_API =
    process.env.NODE_ENV === "production" ? "https://insidebysana-api.herokuapp.com/api" : "http://localhost:9000/api"

const TOKEN = getCookie("crm_token_access")

export const api = {
    token: TOKEN || null,
    guest: axios.create({
        baseURL: DOMAIN_API,
        headers: {common: {Authorization: "Bearer " + TOKEN}},
        withCredentials: true
    }),
    user: axios.create({
        baseURL: DOMAIN_API + "/user",
        headers: {common: {Authorization: "Bearer " + TOKEN}},
        withCredentials: true
    }),
    teacher: axios.create({
        baseURL: DOMAIN_API + "/user/teacher/1",
        headers: {common: {Authorization: "Bearer " + TOKEN}}
    })
}

export const updateToken = (token: string | null) => {
    api.token = token
    if (token) setCookie("crm_token_access", token, {expires: 30})
    else removeCookie("crm_token_access")

    api.user.defaults.headers.common["Authorization"] = "Bearer " + token
    api.teacher.defaults.headers.common["Authorization"] = "Bearer " + token
}

type MethodProps = "get" | "delete" | "post" | "put" | "patch"

interface ConfigRequestProps {
    type?: "admin" | "user" | "guest"
    api2?: boolean
    data?: any
    signal?: any
    params?: any
}

type ApiRequestProps = (method: MethodProps, url: string, conf?: ConfigRequestProps) => Promise<any>

export const apiRequest: ApiRequestProps = async (method = "get", url: string, conf = {}) => {
    const {data, type = "user", signal, params} = conf
    const source = CancelToken.source()
    const _config = {cancelToken: source.token}

    if (signal) signal.addEventListener("abort", () => source.cancel())

    try {
        const response =
            method === "get"
                ? // @ts-ignore
                await api[type].get(url, {..._config, params})
                : method === "patch"
                ? // @ts-ignore
                await api[type].patch(url, data, {..._config, params})
                : method === "delete"
                    ? // @ts-ignore
                    await api[type].delete(url, {..._config, params, data})
                    : method === "put"
                        ? // @ts-ignore
                        await api[type].put(url, data, {..._config, params})
                        : // @ts-ignore
                        await api[type].post(url, data, {..._config, params})

        return response.data
    } catch (e) {
        if (!axios.isCancel(e)) {
            console.error("-----> ", e)
            if (e.response.status === 401) {
                message({type: "error", content: "Ошибка токена!"})
                throw Error("error_token")
            } else if (e.response.status === 422) {
                e.response.data.errors.map((error: any) => {
                    return message({type: "error", content: error.msg})
                })
            } else {
                message({
                    type: "error",
                    content: e?.response?.data?.message || e?.message || "Неизвестная ошибка!"
                })
                throw Error(e?.response?.data?.message || e?.message || "Неизвестная ошибка!")
            }
        }
    }
}
