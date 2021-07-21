import React from "react"
import styled from "./LoaderBlock.module.css"

const LoaderBlock = () => {
    return (
        <div className={styled.loader}>
            <div className={styled.skCubeGrid}>
                <div className={`${styled.skCube} ${styled.skCube1}`}/>
                <div className={`${styled.skCube} ${styled.skCube2}`}/>
                <div className={`${styled.skCube} ${styled.skCube3}`}/>
                <div className={`${styled.skCube} ${styled.skCube4}`}/>
                <div className={`${styled.skCube} ${styled.skCube5}`}/>
                <div className={`${styled.skCube} ${styled.skCube6}`}/>
                <div className={`${styled.skCube} ${styled.skCube7}`}/>
                <div className={`${styled.skCube} ${styled.skCube8}`}/>
                <div className={`${styled.skCube} ${styled.skCube9}`}/>
            </div>
        </div>
    )
}

export default LoaderBlock