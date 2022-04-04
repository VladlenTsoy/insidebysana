import React, {useEffect} from "react"
import styles from "./Home.module.less"
import {Card, Col, DatePicker, Row, Statistic} from "antd"
import {useGetStatisticMutation} from "./statisticApi"
import moment from "moment"
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"

const {RangePicker} = DatePicker

/**
 * Главная страница учителя
 *
 * @constructor
 */
const Home: React.FC = () => {
    const [fetch, {isLoading, data}] = useGetStatisticMutation()
    const startOfMonth = moment().subtract(1, "months").format("YYYY-MM-DD hh:mm")
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
                    <Col xl={4} md={6} xs={12}>
                        <Card loading={isLoading}>
                            <Statistic title="Выручка" value={Number(data?.revenue).toFixed(0)} />
                        </Card>
                    </Col>
                    <Col xl={4} md={6} xs={12}>
                        <Card loading={isLoading}>
                            <Statistic title="Расходы" value={Number(data?.costs).toFixed(0)} />
                        </Card>
                    </Col>
                    <Col xl={4} md={6} xs={12}>
                        <Card loading={isLoading}>
                            <Statistic title="Кол-во чеков" value={Number(data?.numberOfChecks).toFixed(0)} />
                        </Card>
                    </Col>
                    <Col xl={4} md={6} xs={12}>
                        <Card loading={isLoading}>
                            <Statistic title="Кол-во позиций" value={Number(data?.numberOfPositions).toFixed(0)} />
                        </Card>
                    </Col>
                    <Col xl={4} md={6} xs={12}>
                        <Card loading={isLoading}>
                            <Statistic title="Кол-во онлайн заказов"
                                       value={Number(data?.numberOfOnlineOrders).toFixed(0)} />
                        </Card>
                    </Col>
                    <Col xl={4} md={6} xs={12}>
                        <Card loading={isLoading}>
                            <Statistic title="Кол-во новых клиентов"
                                       value={Number(data?.numberOfNewClients).toFixed(0)} />
                        </Card>
                    </Col>
                    <Col xl={4} md={6} xs={12}>
                        <Card loading={isLoading}>
                            <Statistic title="Средний чек" value={Number(data?.averageCheck).toFixed(0)} />
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card>
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart
                                    width={350}
                                    height={40}
                                    data={
                                        data?.revenueByDay.map(
                                            item => ({
                                                total: item.total,
                                                date: moment(item.date).format("DD MMM YYYY")
                                            })
                                        )
                                    }
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#d7dce0" />
                                    <Tooltip />
                                    <XAxis dataKey="date" stroke="#d7dce0" />
                                    <YAxis stroke="#d7dce0" />
                                    <Bar dataKey="total" fill="#546bd1" name="Выручка" />
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
