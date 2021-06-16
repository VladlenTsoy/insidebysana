import React, {useCallback, useState} from "react"
import Drawer from "components/drawer/Drawer"
import GoogleMapSelect from "./google-map-select/GoogleMapSelect"

const GoogleMapSelectAction: React.FC = ({children}) => {
    const [visible, setVisible] = useState(false)

    const close = useCallback(() => setVisible(false), [])
    const handleClick = () => setVisible(true)

    const action = React.Children.map(children, (child: any) =>
        React.cloneElement(child, {onClick: handleClick})
    )

    return (
        <>
            {action}
            <Drawer visible={visible} onClose={close} width="100%">
                <GoogleMapSelect close={close}/>
            </Drawer>
        </>
    )
}
export default GoogleMapSelectAction
