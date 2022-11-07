
const tg = window.Telegram.WebApp

function App() {

    const onClose = ()=>{
        tg.close()
    }
  return (
    <div className="App">
        WORK
        <button onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default App;
