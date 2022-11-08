import Button from "../button/Button";
import useTelegram from "../../hooks/useTelegram";
import './Header.css'



export default function Header(){
    const {onClose, user} = useTelegram()

    return(
        <div className={`header`}>
            <Button onClick={onClose}>Закрыть</Button>
            <span>{user?.username}</span>
        </div>
    )
}