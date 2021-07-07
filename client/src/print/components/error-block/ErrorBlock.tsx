import React from "react"
import {Result, Button, Typography} from "antd"
import {CloseCircleOutlined, LeftOutlined, SyncOutlined} from "@ant-design/icons"
import {useHistory} from "react-router-dom"

const {Paragraph, Text} = Typography

interface ErrorBlockProps {
    message?: string
}

const ErrorBlock: React.FC<ErrorBlockProps> = ({message}) => {
    const history = useHistory()

    const back = () => history.goBack()
    const refresh = () => history.go(0)

    return (
        <>
            <Result
                status="error"
                title="Неизвестная ошибка!"
                subTitle="Произошла неизвестная ошибка, попробуйте обновить страницу или вернуться назад."
                extra={[
                    <Button key="back" size="large" icon={<LeftOutlined />} onClick={back}>
                        Вернуться назад
                    </Button>,
                    <Button key="refresh" size="large" icon={<SyncOutlined />} onClick={refresh}>
                        Обновить страницу
                    </Button>
                ]}
            >
                {message && (
                    <div className="desc">
                        <Paragraph>
                            <Text
                                strong
                                style={{
                                    fontSize: 16
                                }}
                            >
                                Отправленный вами контент содержит следующую ошибку:
                            </Text>
                        </Paragraph>
                        <Paragraph>
                            <CloseCircleOutlined className="site-result-demo-error-icon" /> {message}
                        </Paragraph>
                    </div>
                )}
            </Result>
        </>
    )
}
export default ErrorBlock
