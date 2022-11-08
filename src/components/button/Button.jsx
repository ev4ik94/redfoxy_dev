import './Button.css'

export default function Button(props){
    return(
        <button {...props} className={`button button-${props.className}`}></button>
    )
}