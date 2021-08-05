import './App.css';
import logo from "./dimagi-logo.png"
import Form from './components/form/form';

function App() {
  return (
    <div className="App">
      <img src={logo} alt='' />
      <hr width='800px' />
      <br/>
      <Form />
    </div>
  );
}

export default App;
