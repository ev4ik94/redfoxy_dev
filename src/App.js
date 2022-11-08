import Header from "./components/header/Header";
import {useEffect} from "react";
import useTelegram from "./hooks/useTelegram";
import {Route, Routes} from "react-router-dom";

import ProductList from "./components/pages/productList/ProductList";
import Form from "./components/pages/form/Form";

function App() {
    const {tg, onToggleButton} = useTelegram()

    useEffect(()=>{
        tg.ready()
    }, [])


  return (
    <div className="App">
        <Header />
        <Routes>
            <Route index element={<ProductList />}/>
            <Route path='form' element={<Form />}/>
            <Route path='*' element={<Form />}/>
        </Routes>
    </div>
  );
}

export default App;
