import React from "react"
import {Menu, Layout} from "antd"
import {useGetCategoriesQuery} from "./categoryApi"
import {Link} from "react-router-dom"

const Sider: React.FC = () => {
    const {data} = useGetCategoriesQuery()

    return (
        <Layout.Sider width={200} className="sider-left-categories">
            <Menu mode="vertical" triggerSubMenuAction="click">
                {data &&
                    data.map(category => (
                        <Menu.SubMenu
                            key={category.id}
                            title={category.title}
                            icon={
                                <img
                                    src={category.url_image}
                                    alt={category.title}
                                    className="sub-menu-icon-item"
                                />
                            }
                        >
                            {category.sub_categories.map(sub => (
                                <Menu.Item key={sub.id}>
                                    <Link to={`/category/${sub.id}`}>{sub.title}</Link>
                                </Menu.Item>
                            ))}
                        </Menu.SubMenu>
                    ))}
            </Menu>
        </Layout.Sider>
    )
}
export default Sider
