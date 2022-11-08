import './form.css'
import {useCallback, useEffect, useState} from "react";
import useTelegram from "../../../hooks/useTelegram";

export default function Form(){

    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [subject, setSubject] = useState('')

    const {tg} = useTelegram()

    const onSendData = useCallback(()=>{
        const data = {
            city,
            street,
            subject
        }

        tg.sendData(JSON.stringify(data))
    }, [city, street, subject])

    useEffect(()=>{
        tg.onEvent('mainButtonClicked', onSendData)

        return ()=>{
            tg.ofEvent('mainButtonClicked', onSendData)
        }
    }, [])

    useEffect(()=>{
       tg.MainButton.setParams({
           text: 'Отправить данные'
       })
    }, [])


    useEffect(()=>{
        if(!city.length || !street.length){
            tg.MainButton.hide();
        }else{
            tg.MainButton.show();
        }
    }, [city, street])

    return(<div className='form'>
        <h3>Введите ваши данные</h3>
        <input className='input' placeholder='Город' value={city} onChange={(e)=>setCity(e.currentTarget.value)}/>
        <input className='input' placeholder='Улица' value={street} onChange={(e)=>setStreet(e.currentTarget.value)}/>

        <select className='select' value={subject} onChange={(e)=>setSubject(e.currentTarget.value)}>
            <option value='physical'>Физ. лицо</option>
            <option value='legal'>Юр. лицо</option>
        </select>
    </div>)
}