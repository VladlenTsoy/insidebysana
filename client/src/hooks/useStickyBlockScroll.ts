import {useEffect, useRef} from "react"

export const useStickyBlockScroll = () => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let lastScrollTop = 0
        let lastDownPosition = 0
        let lastUpPosition = 0
        let maxFixTopUp = 100
        let currentFixTopUp = 0
        let currentFixTopDown = 0
        let lastCurrentFixTopUp = 0
        let lastCurrentFixTopDown = 0
        const productRef = document.getElementById("product")

        const listenToScroll = () => {
            if (ref.current && productRef) {
                // Максимальная высота топа (291)
                const maxFixTopDown = (ref.current.offsetHeight - window.innerHeight)

                const tmp = window.scrollY - (lastUpPosition + lastCurrentFixTopDown)
                // Текущая высота топа
                currentFixTopDown = tmp >= maxFixTopDown ? maxFixTopDown : tmp

                // Разница в высоте
                const heightDifference = (lastDownPosition - window.scrollY) - lastCurrentFixTopUp
                currentFixTopUp = heightDifference >= maxFixTopUp ? maxFixTopUp : heightDifference <= -maxFixTopDown ? -maxFixTopDown : heightDifference

                if (ref.current.offsetHeight > window.innerHeight) {
                    // DOWN
                    if (lastScrollTop <= window.scrollY) {
                        ref.current.style.top = -currentFixTopDown + "px"
                        lastCurrentFixTopUp = currentFixTopDown
                        lastDownPosition = lastScrollTop
                    }
                    // UP
                    else {
                        ref.current.style.top = currentFixTopUp + "px"
                        lastCurrentFixTopDown = currentFixTopUp
                        lastUpPosition = lastScrollTop
                    }
                } else
                    ref.current.style.top = 100 + "px"

                lastScrollTop = window.scrollY
            }
        }

        if (ref.current) {
            window.addEventListener("scroll", listenToScroll)
            return () => {
                window.removeEventListener("scroll", listenToScroll)
            }
        }
    }, [ref])

    return ref
}