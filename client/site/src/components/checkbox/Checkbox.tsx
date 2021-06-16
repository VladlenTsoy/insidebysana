import React from "react"
import RcCheckbox, {Props} from "rc-checkbox"
import "rc-checkbox/assets/index.css"

const Checkbox: React.FC<Props> = (props) =>
    <RcCheckbox {...props} />

export default Checkbox