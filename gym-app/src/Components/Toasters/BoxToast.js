import {motion} from 'framer-motion';
import { useState } from 'react';

const BoxToast = (props) => {
 
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    console.log(x, y)
    return (
        <div id="demo">
            <motion.div id="box" 
            animate={{x: x, y: y}}
            className='border border-danger bg-dark w-25 h-25'
            > class</motion.div>
            <label htmlFor="x">X</label>
            <input type='number'  onChange={(event) => {setX(+event.target.value)}}/>
            <label htmlFor='y'>Y</label>
            <input type='number'  onChange={(event) => {setY(+event.target.value)}}/>
        </div>
    )
}

export default BoxToast;