import {Drawer} from "antd"
import {Client} from "admin/lib/types/Client"
import React, {useCallback, useState} from "react"
import ClientMore from "./client-more/ClientMore"

interface ClientMoreActionProps {
    clientId: Client["id"]
}

const ClientMoreAction: React.FC<ClientMoreActionProps> = ({children, clientId}) => {
    const [visible, setVisible] = useState(false)

    const close = useCallback(() => setVisible(false), [])
    const handleClick = () => setVisible(true)

    const action = React.Children.map(children, (child: any) =>
        React.cloneElement(child, {onClick: handleClick})
    )

    return (
        <>
            {action}
            <Drawer visible={visible} onClose={close} width="100%" title="Клиент">
                <ClientMore clientId={clientId} />
            </Drawer>
        </>
    )
}
export default ClientMoreAction
