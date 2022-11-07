import Header from "./components/header/Header";
import {useEffect} from "react";
import useTelegram from "./hooks/useTelegram";


function App() {
    const {ready, onToggleButton} = useTelegram()

    useEffect(()=>{
        ready()
    }, [])


  return (
    <div className="App">
        <button onClick={onToggleButton}>Toggle</button>
        <Header />
    </div>
  );
}

export default App;
