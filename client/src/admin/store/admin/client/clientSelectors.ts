import {Client} from "admin/lib/types/Client"
import {useSelector} from "react-redux"
import {AdminState} from "../store"
import {selectAllClients, getClientById} from "./clientSlice"

// Загрузка
export const useLoadingClient = () => useSelector((state: AdminState) => state.client.loading)

// Вывод всех клиентов
export const useSelectAllClients = () => useSelector(selectAllClients)

// Вывод клиента по Id
export const useSelectClientById = (id: Client["id"] | undefined) =>
    useSelector((state: AdminState) => getClientById(state, id || 0))
