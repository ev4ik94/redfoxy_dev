import './productItem.css'
import Button from "../../../../button/Button";



export default function ProductItem({className, product, onAdd}){



    const onAddHandler = ()=>{
        onAdd(product)
    }
    return(
        <div className={`product ${className}`}>
            <div className="img">
                <img src={product.img}/>
            </div>
            <div className="title">{product.title}</div>
            <div className="description">{product.description}</div>
            <div className="price">
                <span>Стоимость <b>{product.price}</b></span>
            </div>

            <Button className='add-button' onClick={onAddHandler}>Добавить в корзину</Button>
        </div>
    )
}