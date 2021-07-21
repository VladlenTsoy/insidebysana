import React from "react"
import "./Home.less"
import { DatePicker, Col, Row, Card} from "antd";

const {RangePicker} = DatePicker

/**
 * Главная страница учителя
 *
 * @constructor
 */
const Home: React.FC = () => {
    return (
        <div className="home">
          <div className="datepicker">
            <div>
              <RangePicker size="large"/>
            </div>
          </div>
          <div className="widgets">
            <Row gutter={15}>
              <Col xl={6}><Card/></Col>
              <Col xl={6}><Card/></Col>
              <Col xl={6}><Card/></Col>
              <Col xl={6}><Card/></Col>
              <Col xl={6}><Card/></Col>
              <Col xl={6}><Card/></Col>
            </Row>
          </div>
        </div>
    )
}

export default Home
