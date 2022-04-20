import React, {useEffect, useState} from "react"
import {Button, Card, DatePicker, Radio} from "antd"
import styles from "./FilterBlock.module.less"
import {CalendarOutlined, FilterOutlined} from "@ant-design/icons"
import moment from "moment"
import {StatisticApiProps} from "../statisticApi"

const {RangePicker} = DatePicker

type DateValueType = "today" | "yesterday" | "7d" | "30d" | "3m" | "6m" | "12m" | "custom"

interface FilterBlockProps {
    fetch: (data: StatisticApiProps) => void
}

const FilterBlock: React.FC<FilterBlockProps> = ({fetch}) => {
    const [dateValue, setDateValue] = useState<DateValueType>("today")
    const startOfMonth = moment().subtract(1, "months").format("YYYY-MM-DD hh:mm")
    const endOfMonth = moment().format("YYYY-MM-DD hh:mm")

    const onClickHandler = () => {
        setDateValue("custom")
    }

    const onDateHandler = (e: any) => {
        setDateValue(e.target.value)
    }

    const onChangeHandler = (e: any) => {
        fetch({type: dateValue, dateFrom: e[0], dateTo: e[1]})
    }

    useEffect(() => {
        fetch({type: dateValue, dateFrom: startOfMonth, dateTo: endOfMonth})
    }, [dateValue, startOfMonth, endOfMonth, fetch])

    return (
        <Card className={styles.cardFilterBlock}>
            <div className={styles.filterBlock}>
                <div className={styles.left}>
                    <Radio.Group
                        defaultValue={dateValue}
                        value={dateValue}
                        onChange={onDateHandler}
                        size="large"
                        buttonStyle="solid"
                    >
                        <Radio.Button value="today">Сегодня</Radio.Button>
                        <Radio.Button value="yesterday">Вчера</Radio.Button>
                        <Radio.Button value="7d">7 дней</Radio.Button>
                        <Radio.Button value="30d">30 дней</Radio.Button>
                        <Radio.Button value="3m">3М</Radio.Button>
                        <Radio.Button value="6m">6М</Radio.Button>
                        <Radio.Button value="12m">12М</Radio.Button>
                    </Radio.Group>
                    {
                        dateValue !== "custom" ?
                            <Button icon={<CalendarOutlined />} size="large" onClick={onClickHandler}>Выбрать</Button> :
                            <RangePicker
                                size="large"
                                className={styles.rangePicker}
                                onChange={onChangeHandler}
                                defaultValue={[moment(startOfMonth), moment(endOfMonth)]}
                            />
                    }
                </div>
                <div className={styles.right}>
                    <Button type="dashed" icon={<FilterOutlined />} size="large">Фильтр</Button>
                </div>
            </div>
        </Card>
    )
}

export default FilterBlock
