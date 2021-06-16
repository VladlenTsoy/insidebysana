import React, {useEffect, useRef, useState} from "react"
import {fetchProductColorBySKU} from "store/cashier/pos/fetchProductColorBySKU"
import {useCashierDispatch} from "store/cashier/store"
import AddedProducts from "./added-products/AddedProducts"
import "./PosSystem.less"
import SearchProducts from "./search-products/SearchProducts"

const Home: React.FC = () => {
    const searchRef = useRef<HTMLInputElement>(null)
    const [search, setSearch] = useState("")
    const dispatch = useCashierDispatch()

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
                    <SearchProducts searchRef={searchRef} />
                    <AddedProducts />
                </div>
            </div>
        </>
    )
}
export default Home
