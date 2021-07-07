import React from "react"
import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"
declare const ENTRY_POINT: String

function importBuildTarget() {
    if (process.env.REACT_APP_BUILD_TARGET === "pos") {
        return import("./pos/Pos")
    } else if (process.env.REACT_APP_BUILD_TARGET === "print") {
        return import("./print/App")
    } else {
        return Promise.reject(new Error("No such build target: " + ENTRY_POINT))
    }
}

importBuildTarget().then(({default: Environment}) =>
    ReactDOM.render(
        <React.StrictMode>
            <Environment />
        </React.StrictMode>,
        document.getElementById("root")
    )
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
