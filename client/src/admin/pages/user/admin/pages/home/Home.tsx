import React from "react"
import styles from "./Home.module.less"
import {Card, Col, Row, Statistic} from "antd"
import {useGetStatisticMutation} from "./statisticApi"
import moment from "moment"
import FilterBlock from "./filter-block/FilterBlock"
import {CarOutlined, DollarCircleFilled, FileTextOutlined} from "@ant-design/icons"
import {Line, Bar} from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement
} from "chart.js"
import {formatDate} from "../../../../../utils/formatDate"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
)

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const
        }
    }
}

const labels = ["January", "February", "March", "April", "May", "June", "July"]

export const data3 = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: labels.map(() => 10),
            backgroundColor: "rgba(255, 99, 132, 0.5)"
        },
        {
            label: "Dataset 2",
            data: labels.map(() => 20),
            backgroundColor: "rgba(53, 162, 235, 0.5)"
        }
    ]
}
/**
 * Главная страница учителя
 *
 * @constructor
 */
const Home: React.FC = () => {
    const [fetch, {isLoading, data}] = useGetStatisticMutation()

    return (
        <div className={styles.home}>
            <FilterBlock fetch={fetch} />
            <Card style={{marginBottom: "1rem"}}>
                <Row gutter={40}>
                    <Col xxl={14} xl={12} xs={24}>
                        <Row gutter={15}>
                            <Col xxl={12} xl={16} xs={24}>
                                <Statistic
                                    prefix={<DollarCircleFilled />}
                                    className={styles.statisticTitle}
                                    suffix="сум"
                                    title="Выручка"
                                    loading={isLoading}
                                    value={Number(data?.revenue).toFixed(0)}
                                />
                                <Statistic
                                    title="Расходы"
                                    suffix="сум"
                                    loading={isLoading}
                                    value={Number(data?.costs).toFixed(0)}
                                />
                            </Col>
                            <Col xxl={12} xl={8} xs={24}>
                                <Line options={{
                                    plugins: {
                                        legend: {
                                            display: false
                                        },
                                        subtitle: {
                                            display: false
                                        }
                                    },
                                    responsive: true,
                                    interaction: {
                                        mode: "index" as const,
                                        intersect: false
                                    },
                                    scales: {
                                        y: {
                                            title: {
                                                display: false
                                            },
                                            display: false
                                        },
                                        x: {
                                            display: false
                                        }
                                    }
                                }} data={
                                    {
                                        labels: data?.revenueByDay.map((val => moment(val.date).format("M"))),
                                        datasets: [
                                            {
                                                fill: true,
                                                label: "Dataset 1",
                                                data: data?.revenueByDay.map((val => val.total)),
                                                borderColor: "#07ca63",
                                                backgroundColor: "#07ca63"
                                                // yAxisID: "y"
                                            }
                                        ]
                                    }
                                } />
                            </Col>
                        </Row>
                    </Col>
                    <Col xxl={6} xl={7} lg={12} xs={24}>
                        <Row gutter={15}>
                            <Col span={24}>
                                <Statistic
                                    prefix={<FileTextOutlined />}
                                    className={styles.statisticTitle}
                                    suffix="сум"
                                    title="Средний чек"
                                    loading={isLoading}
                                    value={Number(data?.averageCheck).toFixed(0)}
                                />
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title="Кол-во чеков"
                                    loading={isLoading}
                                    value={Number(data?.numberOfChecks).toFixed(0)}
                                />
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title="Кол-во позиций"
                                    loading={isLoading}
                                    value={Number(data?.numberOfPositions).toFixed(0)}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col xxl={4} xl={5} lg={12} xs={24}>
                        <Row gutter={15}>
                            <Col span={24}>
                                <Statistic
                                    prefix={<CarOutlined />}
                                    className={styles.statisticTitle}
                                    title="Кол-во онлайн заказов"
                                    loading={isLoading}
                                    value={Number(data?.numberOfOnlineOrders).toFixed(0)}
                                />
                            </Col>
                            <Col span={24}>
                                <Statistic
                                    title="Кол-во новых клиентов"
                                    loading={isLoading}
                                    value={Number(data?.numberOfNewClients).toFixed(0)}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
            <div className={styles.widgets}>
                <Row gutter={15}>
                    <Col span={24}>
                        <Card>
                            <Bar data={
                                {
                                    labels: data?.revenueByDay.map((val => formatDate(val.date))),
                                    datasets: [
                                        {
                                            label: "Dataset 1",
                                            data: data?.revenueByDay.map((val => val.total)),
                                            borderColor: "#07ca63",
                                            backgroundColor: "#07ca63"
                                            // yAxisID: "y"
                                        }
                                    ]
                                }
                            } options={options} />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Home
