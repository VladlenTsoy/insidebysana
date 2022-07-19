import React, {useEffect, useState} from "react"
import {Button, Card, DatePicker, Radio, Dropdown, Menu, Space} from "antd"
import styles from "./FilterBlock.module.less"
import {CalendarOutlined, FilterOutlined, DownOutlined, CheckOutlined} from "@ant-design/icons"
import moment from "moment"
import {StatisticApiProps} from "../statisticApi"

const {RangePicker} = DatePicker

type DateValueType = "today" | "yesterday" | "7d" | "30d" | "3m" | "6m" | "12m" | "custom"

const dates: {val: DateValueType, title: string}[] = [
    {val: "today", title: "Сегодня"},
    {val: "yesterday", title: "Вчера"},
    {val: "7d", title: "7 дней"},
    {val: "30d", title: "30 дней"},
    {val: "3m", title: "3 месяца"},
    {val: "6m", title: "6 месяцев"},
    {val: "12m", title: "12 месяцев"}
]

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

    const onClickDateHandler = (date: DateValueType) => {
        setDateValue(date)
    }

    const onChangeHandler = (e: any) => {
        if (e) fetch({type: dateValue, dateFrom: e[0], dateTo: e[1]})
    }

    useEffect(() => {
        fetch({type: dateValue, dateFrom: startOfMonth, dateTo: endOfMonth})
    }, [dateValue, startOfMonth, endOfMonth, fetch])


    const menu = (
        <Menu>
            {dates
                .map(date =>
                    <Menu.Item
                        key={date.val}
                        onClick={() => onClickDateHandler(date.val)}>
                        <Space>
                            {
                                dateValue === date.val &&
                                <span className={styles.check}><CheckOutlined /></span>
                            }{date.title}
                        </Space>
                    </Menu.Item>
                )}
        </Menu>
    )

    return (
        <Card className={styles.cardFilterBlock}>
            <div className={styles.filterBlock}>
                <div className={styles.left}>
                    <Radio.Group
                        className={styles.radioGroup}
                        defaultValue={dateValue}
                        value={dateValue}
                        onChange={onDateHandler}
                        size="large"
                        buttonStyle="solid"
                    >
                        {dates.map(date =>
                            <Radio.Button value={date.val} key={date.val}>{date.title}</Radio.Button>
                        )}
                    </Radio.Group>
                    <div className={styles.moreDates}>
                        <Dropdown overlay={menu} placement="bottomLeft" arrow>
                            <Button size="large">
                                <Space>
                                    {dates.find(date => date.val === dateValue)?.title || "Выбрать"}
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    </div>
                    <div className={styles.rangePickerContainer}>
                        {
                            dateValue !== "custom" ?
                                <Button icon={<CalendarOutlined />} size="large"
                                        onClick={onClickHandler}>Выбрать</Button> :
                                <RangePicker
                                    size="large"
                                    className={styles.rangePicker}
                                    onChange={onChangeHandler}
                                    defaultValue={[moment(startOfMonth), moment(endOfMonth)]}
                                />
                        }
                    </div>
                </div>
                <div className={styles.right}>
                    <Button type="dashed" icon={<FilterOutlined />} size="large">Фильтр</Button>
                </div>
            </div>
        </Card>
    )
}

export default FilterBlock
