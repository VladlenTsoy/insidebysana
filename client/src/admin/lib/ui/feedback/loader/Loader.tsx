import React from "react";
import { LoadingOutlined } from '@ant-design/icons';
import './Loader.less'

const Loader: React.FC<any> = ({text}) => {
    return (
        <div className="loader">
            <LoadingOutlined spin />
            {text ? <p>{text}</p> : null}
        </div>
    );
};

export default Loader;