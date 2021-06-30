import React from "react"
import "./Home.less"
import {Row, Col} from "antd"
import CardProduct from "components/card-product/CardProduct"
import {useGetProductsLatestQuery} from "./homeApi"

const Home: React.FC = () => {
    const {data} = useGetProductsLatestQuery()

    return (
        <Row gutter={16}>
            {data &&
                data.map((product, key) => (
                    <Col xxl={4} xl={4} lg={6} md={8} sm={12} xs={24} key={key}>
                        <CardProduct
                            title={product.title}
                            image={product.url_thumbnail}
                            price={99999}
                            link={`/product/${product.id}`}
                        />
                    </Col>
                ))}
        </Row>
    )
}
export default Home
