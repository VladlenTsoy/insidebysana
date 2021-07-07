import cookie from "js-cookie"

// Добавить куки
export const setCookie = (name: string, value: string, options?: any) =>
    cookie.set(name, value, {sameSite: "strict", ...options})

// Выбрать куки
export const getCookie = (name: string) => cookie.get(name)

// Удалить куки
export const removeCookie = (name: string) => cookie.remove(name)
