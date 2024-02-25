import logo from './logo.svg';
import './App.css';
import CalendarScreen from './components/CalendarScreen/CalendarScreen'; 

function App() {
  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      {/* Your content goes here */}
      <CalendarScreen />
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
