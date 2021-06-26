import {Card, Row, Col, Result, Button, Typography} from "antd"
import React from "react"
import {useGetProductsByPrintIdQuery} from "./productApi"
import {CloseCircleOutlined} from "@ant-design/icons"

const {Paragraph, Text} = Typography

const Products = () => {
    const {data, error, isLoading} = useGetProductsByPrintIdQuery(1)

    if (isLoading) return <div>Loading...</div>

    if (error)
        return (
            <Result
                status="error"
                title="Submission Failed"
                subTitle="Please check and modify the following information before resubmitting."
                extra={[
                    <Button type="primary" key="console">
                        Go Console
                    </Button>,
                    <Button key="buy">Buy Again</Button>
                ]}
            >
                <div className="desc">
                    <Paragraph>
                        <Text
                            strong
                            style={{
                                fontSize: 16
                            }}
                        >
                            The content you submitted has the following error:
                        </Text>
                    </Paragraph>
                    <Paragraph>
                        <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account has been
                        frozen. <a>Thaw immediately &gt;</a>
                    </Paragraph>
                    <Paragraph>
                        <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account is not
                        yet eligible to apply. <a>Apply Unlock &gt;</a>
                    </Paragraph>
                </div>
            </Result>
        )

    return (
        <>
            <Row gutter={16}>
                {!!data &&
                    data.map((_, key) => (
                        <Col xxl={4} xl={4} lg={6} md={8} sm={12} xs={24} key={key}>
                            <Card
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
        </>
    )
}

const PrintProduct: React.FC = () => {
    return (
        <>
            <Card>1231231</Card>
            <Products />
        </>
    )
}
export default PrintProduct
