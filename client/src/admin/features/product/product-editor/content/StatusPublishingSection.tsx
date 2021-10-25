import React, {useEffect} from "react"
import {Typography, Form, Checkbox, Select, Divider} from "antd"
import {useGetFreeHomePositionsQuery} from "admin/features/home-position/homePositionApi"
import {Element} from "react-scroll"

const {Title} = Typography

interface StatusPublishingSectionProps {
    clearHomePosition: () => void
    homePosition?: number
    isHomePosition: boolean
    toggleIsHomePosition: () => void
}

const StatusPublishingSection: React.FC<StatusPublishingSectionProps> = (
    {
        clearHomePosition,
        homePosition,
        isHomePosition,
        toggleIsHomePosition
    }
) => {
    const {data, isLoading} = useGetFreeHomePositionsQuery(homePosition || 0)

    useEffect(() => {
        if (!homePosition) clearHomePosition()
    }, [homePosition, clearHomePosition])

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
            <div style={{marginBottom: 24}}>
                <Checkbox onChange={toggleIsHomePosition} checked={isHomePosition}>
                    На главной
                    <br />
                    <Typography.Text type="secondary">
                        Отображать продукт на главной странице под указанной позицией.
                    </Typography.Text>
                </Checkbox>
            </div>
            <div style={{marginLeft: "1.5rem"}}>
                <Form.Item name="home_position" rules={[{required: isHomePosition, message: "Выберите позицию!"}]}>
                    <Select
                        size="middle"
                        style={{width: "200px"}}
                        disabled={!isHomePosition}
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
