import React, {useEffect, useState} from "react"
import {fetchProductColorBySKU} from "./fetchProductColorBySKU"
import {useDispatch} from "../store"
import AddedProducts from "./added-products/AddedProducts"
import "./Home.less"
import GridProducts from "./search-products/GridProducts"

const Home: React.FC = () => {
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        let str = ""
        let timeout: any

        const clearSearchStr = () => {
            str = ""
            setSearch("")
        }

        const keyPressHandler = (event: any) => {
            // Создание таймаута
            if (timeout) clearTimeout(timeout)
            timeout = setTimeout(clearSearchStr, 100)
            // Символ клавиши
            let keyName = event.key
            // Если сработал enter
            if (event.code === "Enter") {
                // Проверка на SKU
                if (/(PC\d+S\d+)+/g.test(str) || /(ЗС\d+Ы\d+)+/g.test(str)) {
                    if (/(ЗС\d+Ы\d+)+/g.test(str))
                        // Замена кирилицы
                        str = str.replace("З", "P").replace("С", "C").replace("Ы", "S")
                    // Отмена события
                    event.preventDefault()
                    setSearch(str.toUpperCase())
                    clearSearchStr()
                }
            }

            // При нажатии клавиш
            else {
                if (keyName.includes("Shift"))
                    // Замена Shift
                    keyName = keyName.replaceAll("Shift", "")
                str = str + keyName
            }
        }

        document.addEventListener("keydown", keyPressHandler)
        return () => {
            document.removeEventListener("keydown", keyPressHandler)
        }
    }, [])

    useEffect(() => {
        // Поиск по SKU
        dispatch(fetchProductColorBySKU({sku: search}))
    }, [search, dispatch])

    return (
        <>
            <div className="pos-system">
                <div className="container">
                    <GridProducts />
                    <AddedProducts />
                </div>
            </div>
        </>
    )
}
export default Home
