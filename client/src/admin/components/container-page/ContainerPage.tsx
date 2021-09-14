import React from "react"
import "./ContainerPage.less"

const ContainerPage: React.FC = ({children}) => {
    return (
        <div className="container-page">
            <div className="content">{children}</div>
        </div>
    )
}
export default ContainerPage
