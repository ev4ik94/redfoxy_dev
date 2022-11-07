const tg = window.Telegram.WebApp

export default function useTelegram(){

    const onClose = ()=>{
        tg.close()
    }

    const ready = ()=>{
        tg.ready()
    }

    const onToggleButton = ()=>{
        if(tg.MainButton.isVisible){
            tg.MainButton.hide();
        }else{
            tg.MainButton.show();
        }
    }

    return {onClose, ready, tg, user: tg?.initDataUnsafe?.user, onToggleButton}
}