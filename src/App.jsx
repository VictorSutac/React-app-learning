import "./App.css";
import { Counter } from "./components/Counter";
import { List } from "./components/List";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <section id="center">
        
        <div>
          <h1>Get started</h1>
          
        </div>
        {/* <button
          type="button"
          className="counter"
          // onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button> */}
        {/* <Button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </Button> */}
        <Counter />
        <List />
      </section>

      <div className="ticks"></div>

    

      
    </>
  );
}

export default App;
