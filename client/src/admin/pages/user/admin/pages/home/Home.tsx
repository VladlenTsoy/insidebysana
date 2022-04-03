import React, {useEffect} from "react"
import styles from "./Home.module.less"
import {Card, Col, DatePicker, Row, Statistic} from "antd"
import {useGetStatisticMutation} from "./statisticApi"
import moment from "moment"
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"

const {RangePicker} = DatePicker

/**
 * Главная страница учителя
 *
 * @constructor
 */
const Home: React.FC = () => {
    const [fetch, {isLoading, data}] = useGetStatisticMutation()
    const startOfMonth = moment().startOf("month").format("YYYY-MM-DD hh:mm")
    const endOfMonth = moment().format("YYYY-MM-DD hh:mm")

    const onChangeHandler = (e: any) => {
        fetch({dateFrom: e[0], dateTo: e[1]})
    }

    useEffect(() => {
        fetch({dateFrom: startOfMonth, dateTo: endOfMonth})
    }, [])

    return (
        <div className={styles.home}>
            <div className={styles.datepicker}>
                <RangePicker size="large" className={styles.rangePicker} onChange={onChangeHandler}
                             defaultValue={[moment(startOfMonth), moment(endOfMonth)]} />
            </div>
            <div className={styles.widgets}>
                <Row gutter={15}>
                    <Col xl={4}>
                        <Card loading={isLoading}>
                            <Statistic title="Выручка" value={data?.revenue.toFixed(0)} />
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card loading={isLoading}>
                            <Statistic title="Расходы" value={data?.costs.toFixed(0)} />
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card loading={isLoading}>
                            <Statistic title="Кол-во чеков" value={data?.numberOfChecks.toFixed(0)} />
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card loading={isLoading}>
                            <Statistic title="Кол-во позиций" value={data?.numberOfPositions.toFixed(0)} />
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card loading={isLoading}>
                            <Statistic title="Кол-во онлайн заказов" value={data?.numberOfOnlineOrders.toFixed(0)} />
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card loading={isLoading}>
                            <Statistic title="Кол-во новых клиентов" value={data?.numberOfNewClients.toFixed(0)} />
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card loading={isLoading}>
                            <Statistic title="Средний чек" value={data?.averageCheck.toFixed(0)} />
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card>
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart width={350} height={40} data={data?.revenueByDay}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Bar dataKey="total" fill="#8884d8" />
                                    <Tooltip />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Legend />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Home
