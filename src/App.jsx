import './App.css';
import Main from './components/Main/Main';
import { TimerProvider } from './context/useTimer';
import { Header } from './Header/header';


function App() {

  return (
    <>
      <TimerProvider>
        <Header />
        <Main />
      </TimerProvider>
    </>
  )
}

export default App;
