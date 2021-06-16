import React, {useState} from "react"
import {Button, Space, Tabs} from "antd"
import CategoriesProvider from "../../../lib/providers/categories-provider/CategoriesProvider"
import {LoadingBlock} from "lib/ui"
import {
    DollarOutlined,
    FullscreenExitOutlined,
    FullscreenOutlined,
    PoweroffOutlined,
    SkinOutlined
} from "@ant-design/icons"
import "./Cashier.less"
import logoSvg from "assets/images/logo.png"
import SizesProvider from "lib/providers/sizes-provider/SizesProvider"
import {useUser} from "hooks/use-user"

const {TabPane} = Tabs

const PosSystem = React.lazy(() => import("./pages/pos-system/PosSystem"))
const Orders = React.lazy(() => import("./pages/orders/Orders"))

const Cashier: React.FC = () => {
    const {logout} = useUser()
    const [fullScreen, setFullScreen] = useState(false)

    const requestFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
            setFullScreen(true)
        } else if (document.exitFullscreen) {
            document.exitFullscreen()
            setFullScreen(false)
        }
    }

    const OperationsSlot = {
        left: (
            <>
                <img src={logoSvg} alt="logo" className="logo" />
            </>
        ),
        right: (
            <Space size={[8, 16]} wrap>
                <Button
                    icon={!fullScreen ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
                    onClick={requestFullScreen}
                >
                    {!fullScreen ? "Увеличить" : "Уменьшить"}
                </Button>
                <Button danger icon={<PoweroffOutlined />} onClick={logout}>
                    Выйти
                </Button>
            </Space>
        )
    }

    return (
        <CategoriesProvider>
            <SizesProvider>
                <div className="cashier">
                    <Tabs defaultActiveKey="1" size="large" centered tabBarExtraContent={OperationsSlot}>
                        <TabPane
                            tab={
                                <>
                                    <SkinOutlined />
                                    Товары
                                </>
                            }
                            key="1"
                        >
                            <div className="container">
                                <React.Suspense fallback={<LoadingBlock title="Загрузка страницы..." />}>
                                    <PosSystem />
                                </React.Suspense>
                            </div>
                        </TabPane>
                        <TabPane
                            tab={
                                <>
                                    <DollarOutlined />
                                    Заказы
                                </>
                            }
                            key="2"
                        >
                            <div className="container">
                                <React.Suspense fallback={<LoadingBlock title="Загрузка страницы..." />}>
                                    <Orders />
                                </React.Suspense>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </SizesProvider>
        </CategoriesProvider>
    )
}
export default Cashier
