import React from "react"
import {formatDate} from "utils/formatDate"
import {formatPhone} from "utils/formatPhone"
import moment from "moment"
import {Typography, Descriptions, Statistic} from "antd"
import {Client} from "types/Client"
import "./Details.less"
import {formatPrice} from "utils/formatPrice"

const {Text} = Typography

interface DetailsProps {
    client: Client
}

const Details: React.FC<DetailsProps> = ({client}) => {
    return (
        <div className="client-details">
            <div className="information">
                <Descriptions layout="vertical" bordered column={5}>
                    <Descriptions.Item label="Имя">{client.full_name}</Descriptions.Item>
                    <Descriptions.Item label="Телефон">
                        <a href={`tel:${client.phone}`}>{formatPhone(client.phone)}</a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Почта">
                        {client.email || <Text type="secondary">Пусто</Text>}
                    </Descriptions.Item>
                    <Descriptions.Item label="Дата рождения">
                        {client.date_of_birth ? (
                            moment(client.date_of_birth).format("DD/MM/YYYY")
                        ) : (
                            <Text type="secondary">Пусто</Text>
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Создан">{formatDate(client.created_at)}</Descriptions.Item>
                    <Descriptions.Item label="Откуда">
                        {client.source?.title || <Text type="secondary">Пусто</Text>}
                    </Descriptions.Item>
                    <Descriptions.Item label="Instagram">
                        {client.instagram || <Text type="secondary">Пусто</Text>}
                    </Descriptions.Item>
                    <Descriptions.Item label="Telegram">
                        {client.telegram || <Text type="secondary">Пусто</Text>}
                    </Descriptions.Item>
                    <Descriptions.Item label="Facebook">
                        {client.facebook || <Text type="secondary">Пусто</Text>}
                    </Descriptions.Item>
                </Descriptions>
            </div>
            <div className="statistics">
                <div>
                    <Statistic title="Status" value="Pending" />
                </div>
                <div>
                    <Statistic title="Status" value="Pending" />
                </div>
                <Statistic title="Всего" value={`${formatPrice(10000000)} сум`} />
                <Statistic title="Status" value="Pending" />
            </div>
        </div>
    )
}
export default Details
