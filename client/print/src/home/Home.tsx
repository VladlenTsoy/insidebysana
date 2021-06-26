import React from "react"
import "./Home.less"
import {Row, Col, Card} from "antd"
import {useHistory} from "react-router"

const Home: React.FC = () => {
    const history = useHistory()

    const clickHandler = () => {
        history.push("/print-product")
    }

    return (
        <Row gutter={16}>
            {Array(20)
                .fill(1)
                .map((_, key) => (
                    <Col xxl={4} xl={4} lg={6} md={8} sm={12} xs={24} key={key}>
                        <Card
                            onClick={clickHandler}
                            className="card-print-product"
                            cover={
                                <img
                                    alt="example"
                                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                />
                            }
                        >
                            <Card.Meta title="Europe Street beat" />
                        </Card>
                    </Col>
                ))}
        </Row>
    )
}
export default Home
