import Button from "../button/Button";
import useTelegram from "../../hooks/useTelegram";



export default function Header(){
    const {onClose, user} = useTelegram()

    return(
        <div className={`header`}>
            <Button onClick={onClose}>Закрыть</Button>
            <span>{user?.username}</span>
        </div>
    )
}