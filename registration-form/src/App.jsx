import { useState } from "react";
import "./App.css";

function App() {
  const [checked,setChecked]=useState(false)
  const buttonVisibility = () => setChecked((prev) => !prev)
  return (
    <>
      <div>
        <h1>Formularz zgłoszeniowy na kurs programowania</h1>
      </div>
      <form >
        <h2>Dane osobowe</h2>
        <input type="text" placeholder="Imię" />
        <br />
        <input type="text" placeholder="Nazwisko" />
        <br />
        <input type="email" placeholder="E-mail" />
        <br />
        <input type="number" placeholder="Numer telefonu" />
        <h2>Preferencje kursu</h2>
        <p>
          Wybierz formę nauki:
          <input type="radio" />
          stacjonarnie
          <input type="radio" />
          online
        </p>
        <select size={5} multiple={true}>
          <option>JavaScript</option>
          <option>React</option>
          <option>Html</option>
          <option>CSS</option>
          <option>Node</option>
        </select>
        <h2>Dodaj swoje CV</h2>
        <input type="file" />
        <h2>Doświadczenie w Programowaniu</h2>
        <p>
          <input onClick={(buttonVisibility)} type="checkbox" /> <label>Czy posiadasz doświadczenie w programowaniu?</label>
        </p>
        {checked && (<button>Dodaj doświadczenie</button>)}<br/>
        <button>Wyślij zgłoszenie</button>
      </form>
    </>
  );
}

export default App;
