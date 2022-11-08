import './productList.css'
import ProductItem from "./_modals/productItem/ProductItem";
import {useCallback, useEffect, useState} from "react";
import useTelegram from "../../../hooks/useTelegram";

const products = [
    {
        id: 1,
        img: 'data:image/jpeg;base64,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',
        title: 'Товар 01',
        price: 20000,
        description: 'Товар 01 описание'
    },
    {
        id: 2,
        img: 'data:image/jpeg;base64,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',
        title: 'Товар 02',
        price: 20000,
        description: 'Товар 02 описание'
    },
    {
        id: 3,
        img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBESEhISEhIRGBIYGBIYGBUYEhIYGBgYGBgZGRoYGBgcIS4lHB4rIRgZJjgmKy8xNTY1GiQ7QDs0Py40NTEBDAwMEA8QHhISHTQkJCExNjQ0NDQ0NDQ0NDQ0NDQ0MTQ0NDQ0NDQ0NDQ0NDQ0MTQ0NDQ0MTQ0NDQ0NDExMTQxMf/AABEIAQoAvgMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAQUGAgMEBwj/xABCEAACAQIDAwkDCgUDBQEAAAABAgADEQQSIQUxUQYTIkFhcYGRoTKxwQcUQlJicoKSstEjosLh8DQ1YyQzQ0SzFv/EABkBAQADAQEAAAAAAAAAAAAAAAABAgQDBf/EACQRAQEAAgICAgICAwAAAAAAAAABAhEDIRIxIjJBUQRxI2GB/9oADAMBAAIRAxEAPwD1OMRRyFgI4o4BCEIQIQhAIQhCSijmLMALkgDiTYQg4SPfbWGH/kU626N218I6e1qLbmP5T7pXyx/a3jl+nfCaqOISp7DA92/ym2WV7ghCEAtEY4oChCEJEIRXhDOEIQk45jMhAIQhCBCEISIGERhCP2ptNKIA9qodyDf3nslSxT4jFc5z11CWZQPYZSbbuI0779mu2kOd2jjKrE2pinTQdVyWJPko8zJVrajMMxV9Li+gvumTPK1qwwkm/wAojC7PADDrAuD1nS4vxnclJQqVLanf4bpqw76nu9zsB6WmFOtej3MR53tOUdKkqa5WuDYgkX/zjceZkxhcTm6Le0BfvHHvleWtZn160bzT+031MXkZGG8X8QND5/GdMM9Vyzx2scIlYEAjcQCO4xzYzCKBhCShCEBQvAmKBshCEAjEUcBwhCECEIQCKBigUXDOTiMXTRTmZ3cvbogBQoB8j5zk2OtX5zUNRWIyMA54s6rYeBMlDjqGHqOjhw7sSWyEg8BcdQv18TOlcSoGbLYMvWLGx65hb/w4Fq5S/EZvRwfjOBcTlNRerMrDzK/Aec0YiuecqDqF/UpOR6h6Zv1kes4y1bxidbEAi4+lSpnysvxMxx9UgIew++cLvZUHXzKfv7xNm0XIS/2Cf5hLflTS8bCrZ8PTPWAV/KbD0tO8yB5IsTh/EH+UD+mTtpvwu8ZWPKayoMUcUuqIo4rwkGKEUDbCEIBCEIDgIRQMoXihCBCKECm8phUp1C1JVLZkYFiAFVrqW10IGsjaeIxVTM1U0ObANihfMT1X0t5Sf5QBXqEEXUKisO4sxHqPIyPd6a0wcot9Feo2+A4++Yc7JuRv478Zv2iK6ZdfpGzeC6DzOk5FwhcIg+kRbxNh6CbqrNUqKgPTcgk/VTq9NfBZuw+IAqPUA6FNCV77ZU8rr6zjHS3pnVQNUqEeyBkHn/ZvKG0SDzg6hQY/zgj0mrCXC01+k13c997eVm/NEy84cT2o6DuyoPDeZaOdXHkl/pk42S47xf4yckByNcNhgw3FiPLcfIiT838f1jFn9qIoQl1RMY4oSIoQMDbCEIBCEIBCEIBCEIBNdZ7DT2ju/czZOPGvlV2693h/l5TPLWKcZuoLFpnJvfm9bnrYX18zIzaCl2UbgTa3BF1IHfa3iJN1XDKCCOrz4echK79Iae10R3WuT5gekwVsxR2Ft/GqHeRlB+8dCPDXxmNKkeZqfbK+rX+ExqG1Nu1z5bv2nRgWDUu4gHwIHxkOjYiWLsPoooHiT8PfOXE9GnXy/U8ruqX+M6Gr2RhxI9CRObCYxTUIa2VhUU31BFwdR1yJfStnVW/kbphrbukD+ZEMn5BbAqU6YKKfaIIub2sAoF/CTs9DiylxmmLkllohCE6KsYGEUAiJjMxMDfeEUYgEIQhAhCEAhCVTlvtw0kXDo1qlQdMjeqHS3YW1Hd3wNXKHlgKZanh8pYGxqGxF/sDce8/3kXsTHVsQWFaozXuykndawNuAN7fhMqKvmclvZGpHG3V43Ak9sGoRUzWuSXuBoAKdJ3AHAaek483eOnbj1KswIQtTvrlDAcOPmb/lM4KwBcfZVz6j91mvCuzFKj3z1MPRv98Mcwt3sfOdJINRgL5F0J4k7h7u6Yb100xFbYdaYUMbX1J4E23+sWAIFNrEWJsDfTUq3uDThxjPXaqmhcmyjyK/qipU/wCNSw1JugmYsb6Eg53c9lwgHYDxlpOk3LXTqx+5bfSZie7Mf2aQ9LNn8HbxJI+El8eb4qjQG7K+nXocuvbmD+cwTZpNasp3FDl/CA39LSJjrqpmUdOz8Y2UEe0OvgQNSfSZ47beIpinVSo6l1S6XLKLg26J0toRu4RvgubIVdM7qpH2RmJ+F+zScG3mtoB0Rzar3KHX4TrwzWXTjy3cT+y+XJJC4imLfXTeO0qd/gfCXLDYlKiCpTYMh3Ef5oeyeKswAuZLcl+UnzWuFqMeYewfgt9A/h19nhNsZrHrEULwkoBmMZmEDojihAcIQhAhCEJa8RXWmj1HNlRSxPYBeeK4/HvXr1KznViTbqXgB2AWHgJfvlC2nzdFKCnpOczfcXd5t+kzzOoQqntggpt7z8JO7EZ2aoiAlilfKBvu1F107dw8ZXsMbqD3+8yz8lXCVKlZiBkRgtzbpspt36KfMTnn9avj7W0UbMETVlsmg0DMczG/AXPnaaNp1KdKnUIIAQEk8Celc+OvjIrae2TRF6Z6IVgnF6jXBc/YX1M07IwtVtm1ahrZaj4hQju9Qas1NTqgYgmzjQbzMs4be3e5yOfYNGytXckFlrOvEABVDeHQtxzw5LKW5+qALqoS/As5JtxsNbde6SlRKuMephKVRAUOTO+a75HU1GFgSbaixP0xrNmy8AmEw1RlqU3QPUZ2Un20Ktl1HUFXxl7hqWq+e7pA0aqttVbbhnp772yIfitpYqS2xIPUHF/uvnpkeakzlp4OoamBy4agjk1qrOjo7Ogy5ndgLAE1F3M1yeqdmIwrWcZl6dUqGBN1s7NlNwLG9/OV5MNJwy20Y3Ef9StMG7KtQkfaIJsR3ASG2u6tTTXc1r963H+dpmW3MLXTFVcQi9EBXNyvQzplswvu3jSQD1WINzpp5i9j6mdcMPVUyy9xy4ypuE4S9y3+btI8U/TE0Bt80OT2j5P9q/OMGgY3qUjzbcSoF0P5dPwmWYzyr5K8bkxFSkTpUS4+8huB+Vn8p6pCKDMJlMYG+OKEBiOYxwHFC8guWO0eYwlSx6b/AMNOPSBzHwW/jaB5xym2l85xNSoD0L5U+4ugPjqfxSuYx+qdtVrCRWLeEu7Cnop3TsSowFgeu9vL9pw0dAv3V906EeVHQ4LG5JJ7eHV3SbTlAy4dMNzFLmkJZcr1VfMc12LFjrdyd2htbcJChwIZ7xpKc2ZymTD1EqLhF6FM0lRKzBQrPnd+krFnJC6k7hNuxai1sJUwNLnA9qtbPUNNUAXLoxB3WUAkDrJtYStMwGsldlbPZqdLEmq6B8RTw6FKeZg7nLnY51yqCbaXMa2elkx23Bg2wACZ6ZwiB1BswVwmVgT19A6GReJ2tVxFJ6WFpVmIfn3fLdxZhlCohawBy9ZvY6AXle2ualPEVadRs9RHKs92Obg1zrutDAbRrUSWpVHRiMpKMQSOEaiPwnuWG0FqVFREKELTaqp387l9jsyZmHezSsV3sLTY77yTc8ZxV2gcFZunMVOkwqNqT3zOmJYWTkIbY7C9jsPNHHxnthniHIw2x2FP/Io87j4z26EVjCEIG6OYxgwHAQhAJ5ly+2lzuJ5tTdKIy/jbV/Lor+Ez02ee8peQmIZnq4KspLFmNCsNCSbnJUGup6m/NBFBr1JF4pp2YtcVSdqWJwz0qgF+kDrra69TDtBInFVpMbdE2JGtu2RueltXW0kk30gSZz07sbDfNteoKYyKbsd54dklDoXDV6odqNJ3RCA2RS5Heq6+NpyCsykqwYMDYqQQQe0HdLPyOY0cHtLE8ECKeDBHPvdI9lYVsZszECoGerRccw51cXVSaeY6lTwP1hwEI2q9aoSNJ6jyfwSYSjhsO7uwxSl1r9Bkp1yqMioCthxUm92TdraUbE8ncTRpvUYIy02CVCjq3NubdFwN3tDUXGu+dGATafN5KAxopmwshqqvSuejuHEkjxhN7Ycpdnig603puK+rVaxeoyVHJJJTMNbgoxNzYsR1SISSWNOMr1RTrfOHrJ0QjB2deuwXt0N+vQzh2lh6lDo1KboSLgOhW4PWL7xA5Hr62muq2l5pQ3MMS9hbjA4XPqZ0U5yO2oHjOmmYE3yafLi8If8AnoergT3WeB7Ia1fDnhVpHydZ74YRWMLwMUDdCKEDKOYx3hAhFCBTeXNLnqlGmfZQM573IA9F9ZUsXhVCMg0uLX4X65dNogVKtRjxyj8PR+Ep3KXCA02AJHXobEEbrGY7lvNvxx8ePX+ldr1FpZkQ5nOhbh2CcCsbzfRqZui9iw+lYa9sHpW3TUxJ7A7ZorgamCNOunOMrvVXm6l2BQnoEpYdAC1zYdZkrsrbuEprRwYSouEL58RVfR3IF16KE5VzKl7EnKtuJNOW82Iplkaeh4jaWFfC7RpJiMJndyyKiikpQlSAWYDO9lNzc621jrO3zPZlCnXptUFWk1XJiaZyAFnszB9VFz2dAdkoSYYzcKMGnp+KqUKlbH06dWiterQRKbmoliuRgQGUkg5t432ymxtK/SaowalU+bmrhMM4pLQHOOpcWzlSQpfoLZQRv1tmEouNqBBbrPVOLB4qpScVKbuji/SUkGx6u0dkGk3t+sjjDFaddai08tR61PI1UrYK9sxudGBJN+02kDif3nTiMVUqMalR2dzvZmJJ8T1TjxLWAPfCXBe7nynbTE46FJjqVbjuM7h0Rc6eEjcNV2Yd8r024Mp8iDPoJp84LjqR+mBwuCJ9FUXzIrcVU+YvJRWRhCIwN0IQhAjihCTmFaplVmP0QT5C8ynFtmploVO0AeZA90rldS1OM3ZFbz9E8Tckyncp8QQpA69JaKr2Uyg8psYFa56jMfHN1vzvjjahcbemquNbWB7b7/3nZgMSlUb9RvB0PjIHF4hqlr6LfQTm6yRcd03MNl9r5RpJbeCe+brKo1tKCuLqrudvOSWE2o7dF26XE9f95Gjaz1MUo3TgxO0D1TiL3mOQmQhgzFjc75mi2mYW0csAznxLaoOJPwm4mc+JtZW6w3vsJF9JntM0sLmUTXUwZDLfUXFxJDZWqidmIo3KjtHvmXy1Wzxlj0zZ2wMFhv8AsYWgh+sEUv8AnN29ZJQMJrYRMYzFCG+EIQkQhCECRXKFrUgOLqPQn4SUJkLyhb/tr2sfKw+JnPkvxrpxTeUVnaDWTwnl3KCrnqEE7ju4z0flBWyoe6eTYmrnd24k27hOPDj+WrmvUjUTMDGZjNTPRaYsJleIwrXRSxjqCPa00v1dt+ubqe0iPaU+B+BnEZiYV0m6WORuseOhm/ODK4RNtOs67mPd1QJ1jOjAthjSxS1lc1DSbmGAuq1B0ukN9zlAB3C5vxEJTxxOjDynXh8Wik5jbsIN/SBYeT7XUSdVL1KY4ug8yJB7CYXbQjXcRY+IlhwYviKA41Kf6xMmX2bsb8NvTjEYXimtgEIQgb4QheECBheIwkSubcqXrAfVUeZJPxEsUpu0a5atUP2mH5dB7px5rrF2/j47y3+lO5a4zIjW37h3mecjQSz8u65NVU6vaPuHxlXJk8U1j/a/LlvL+hFCE6uNKEIQEYQhaFRaForRiBkhINxvk9ya2ecXjMPTRc13plxbQU1YF2bgLA+YG8yBE9h+RrGK2GxNGwzpUV72FytRbAX67MjecF9IbGUOb2hjKfVzruO5znH6pLbKH/VUPv0/1CYcr8Pk2kX6qlOm/it0P6BN+xv9VQ++sy5T5tmF/wAf/HokIQmpiEUIXgb7wihAcRhCAmYAEncNT4SnsAzO5+kzHzN5YtrVstMjrboju6/TTxlcxNVUAvbXSZue7sjV/Hmpb+3mvyjYTJXpuNzIV8VN/c3pKhLx8o9QEUR1kk+ABB94lHnXj+sc+T7UQhFOigMOMRMcIFoCIxiEnEYQgE9C+RqtbGV06moFvFKiW9HM89lo+TnH8xtPDEsArlqTdudSFH58nlCuno3L5Rz+EPXkqjyZLe8yN2bVCYii3B094E28ocWMVic6n+GgyJ22JLP4n0AmPJ+kGxdLNuDX8VBYeoEy5XefTZjPHj7ejwivHNTEV4QhA2whAmAQvFeF4Fe5Q1nSrT+rl6Pffpf0yjbV2pnxFFFdc3O0lKXObK4a7WtYgZbfiHGX/lPbm6Ztrnt4FTf3CeXpgR89Wrm1ziwO8mxAA4C5EzZSTK7a+K24TSM+UBv41Jb3srHzI/aVSWHlu5+dZG3qoB8ST+0r87YdYxxz+1ERhFLqUGK8doBSb26tT3XA95EIoEcarHaFpCtHaAhCRadGEFnQ8GUg+ImmdGDS7oPtL7xK30tjO3oWzjmXfJXk2h+d0+9j/K0jKGCOHand7irRpVraXTPcZe7o+pk7yUplsTfqRWN+/oj9XpM8x+caMr8LV4mMLxTUwsrxXmN4XgdERMIoBCKImBqxeFp1VyVBcbx1EHiDKHy0wNDDU0bEkvQZwqWzh0fKxDdHgA2vpPQZQfliU/MaJ4YlPWnVErcZe1sc8seo8k2s6NWco7OpOjMWLEWG8nU8NeE4439o95ikyJt3SgIQkqidWCp3WubezTU938akt/5pyyzcmcBnwe1KxvZMPTUd7Vke/hzXrAr0RmTTEw6EYhGYXhDJZ14MdNdQOkup3DUansnGJJ7Doc7iKFO9s9Wkmb6ud1W9uy95WrRcsTjTVqvUuhREp0aZQOAUQnIelY5jmN9Bvl75IYQpQNRvaqG/4V0X1zHxnLhuReGQANUqtqDvVdeO6WSlTVFVFFlUBQOAAsBKY43y3TPOXHxjZeEUV51cWUV4rxQOmYkxxQHFCYmEGTKh8p1EPsyoT9B6DDxdU9zmW2Vz5QP9sxfdT/8AqkJnt8/mEIGElHAQgE9R5K4HLsHaFQjWquIYfdpplH8yvPLhPbtnAf8A59tP/TxP6HhN9PFzMTMmmEL0jARxQhkJYORtPNjsGP8Ampn8rBv6ZACWTkL/ALhhPvn9DyKtPVe7QvCElxF4rxQgO8RMUUD/2Q==',
        title: 'Товар 03',
        price: 20000,
        description: 'Товар 03 описание'
    },
    {
        id: 4,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQWRX1XvqVHUfWsiLLBEGCH0ZBHICpWhdhh3PO36A3V45mvhuGSKbfvi09OCWSiTXnXZI&usqp=CAU',
        title: 'Товар 04',
        price: 20000,
        description: 'Товар 04 описание'
    }
]

const totalPrice = (items)=>{
    return items.reduce((acc, item)=>{
        return acc+=item.price
    }, 0)
}

export default function ProductList(){
    const [addItem, setAddItem] = useState([])
    const {tg, queryId} = useTelegram()


    const onSendData = useCallback(()=>{
        const data = {
            products: addItem,
            totalPrice: totalPrice(addItem),
            queryId
        }
        tg.MainButton.setParams({
            text: `Загрузка ...`
        })

       fetch('https://radiant-escarpment-13675.herokuapp.com/web-data', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(data)
       }).catch(e=>{
           tg.MainButton.hide()
       })
    }, [addItem])

    useEffect(()=>{
        tg.onEvent('mainButtonClicked', onSendData)

        return ()=>{
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (value)=>{
        const alreadyAdded = addItem.find(item=>item.id===value.id)
        let newItems=[]

        if(alreadyAdded){
            newItems = addItem.filter(item=>item.id!==value.id)
        }else{
            newItems = [...addItem, value]
        }

        setAddItem(newItems)

        if(newItems.length===0){
            tg.MainButton.hide()
        }else{

            tg.MainButton.show()
            tg.MainButton.setParams({
                text: `Купить ${totalPrice(newItems)} сум`
            })
        }
    }

    return(<div className='list'>
        {
            products.map(item=>(
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className='item'
                />
            ))
        }
    </div>)
}


