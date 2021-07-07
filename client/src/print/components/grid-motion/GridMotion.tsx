import React from "react"
import {motion} from "framer-motion"

const GridMotion: React.FC = ({children}) => {
    return (
        <motion.div
            className="grid-cards"
            animate="visible"
            initial="hidden"
            variants={{
                visible: {
                    transition: {
                        delayChildren: 0.05,
                        staggerChildren: 0.05
                    }
                }
            }}
        >
            {React.Children.map(children, (child: any, key) => (
                <motion.div
                    key={key}
                    variants={{
                        hidden: {y: 20, opacity: 0},
                        visible: {
                            y: 0,
                            opacity: 1
                        }
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </motion.div>
    )
}
export default GridMotion
