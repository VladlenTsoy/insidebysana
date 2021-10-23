import React, {useEffect, useState} from "react"
import {Typography, Form, Checkbox, Select, Divider} from "antd"
import {useGetFreeHomePositionsQuery} from "admin/features/home-position/homePositionApi"
import {Element} from "react-scroll"

const {Title} = Typography

interface StatusPublishingSectionProps {
    clearHomePosition: () => void
    homePosition?: number
}

const StatusPublishingSection: React.FC<StatusPublishingSectionProps> = (
    {
        clearHomePosition,
        homePosition
    }
) => {
    const [isHome, setIsHome] = useState(!!homePosition || false)
    const {data, isLoading} = useGetFreeHomePositionsQuery(homePosition || 0)

    const onChangeHandler = () => setIsHome(prevState => !prevState)

    useEffect(() => {
        if (!isHome) clearHomePosition()
    }, [isHome, clearHomePosition])

    return (
        <Element name="status-publishing">
            <Divider />
            <Title level={3}>Статус & Публикация</Title>
            <Form.Item name="status" label="Статус">
                <Select style={{width: "250px", marginBottom: "1rem"}}>
                    <Select.Option value="draft">В проекте</Select.Option>
                    <Select.Option value="published">Опубликовать</Select.Option>
                    <Select.Option value="archive">В архив</Select.Option>
                    <Select.Option value="ending">Закончился</Select.Option>
                </Select>
            </Form.Item>
            <Title level={5} style={{marginBottom: "1.5rem"}}>
                Дополнительно
            </Title>
            <Form.Item name="is_new" valuePropName="checked">
                <Checkbox>
                    Новинка
                    <br />
                    <Typography.Text type="secondary">
                        Отобразить тег <b>new</b> на карточке одежды
                    </Typography.Text>
                </Checkbox>
            </Form.Item>
            <Form.Item style={{marginBottom: ".5rem"}}>
                <Checkbox onChange={onChangeHandler} defaultChecked={isHome}>
                    На главной
                    <br />
                    <Typography.Text type="secondary">
                        Отображать продукт на главной странице под указанной позицией.
                    </Typography.Text>
                </Checkbox>
            </Form.Item>
            <div style={{marginLeft: "1.5rem"}}>
                <Form.Item name="home_position" rules={[{required: isHome, message: "Выберите позицию!"}]}>
                    <Select
                        size="middle"
                        style={{width: "200px"}}
                        disabled={!isHome}
                        loading={isLoading}
                        placeholder="Выберите позицию"
                    >
                        {data &&
                        data.map(position => (
                            <Select.Option value={position} key={position}>
                                {position} позиция
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </div>
        </Element>
    )
}
export default StatusPublishingSection
