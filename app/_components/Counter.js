import styles from "../_styles/Counter.module.css";

export default function Counter({value,setValue,updateQuantity,id}){

    const increaseCounterHandler = ()=>{
        if(value >= 0){
            setValue(currentValue => currentValue+1)
            updateQuantity(id,value + 1)
        }
    }

    const decreaseCounterHandler = ()=>{
        if(value > 1){
            setValue(currentValue => currentValue-1)
            updateQuantity(id,value -1)
        }
    }

    return <div className={styles.counter}>
        <span onClick={decreaseCounterHandler}>-</span>
        {value}
        <span onClick={increaseCounterHandler}>+</span>
    </div>
}