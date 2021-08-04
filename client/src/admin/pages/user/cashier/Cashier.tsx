import React, {useState} from "react"
import {Button, Result, Space, Tabs} from "antd"
import CategoriesProvider from "../../../lib/providers/categories-provider/CategoriesProvider"
import {LoadingBlock} from "admin/lib/ui"
import {
    DollarOutlined,
    FullscreenExitOutlined,
    FullscreenOutlined,
    PoweroffOutlined,
    SkinOutlined
} from "@ant-design/icons"
import "./Cashier.less"
import logoSvg from "assets/images/logo.png"
import SizesProvider from "admin/lib/providers/sizes-provider/SizesProvider"
import {useUser} from "admin/hooks/use-user"

const {TabPane} = Tabs

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
                                <Result
                                    status="404"
                                    title="404"
                                    subTitle={
                                        <>
                                            POS переехал на{" "}
                                            <a href="https://pos.insidebysana.uz/">pos.insidebysana.uz</a>
                                        </>
                                    }
                                    extra={
                                        <a href="https://pos.insidebysana.uz/">
                                            <Button type="primary">Перейти</Button>
                                        </a>
                                    }
                                />
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
