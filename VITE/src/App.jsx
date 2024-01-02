import { useEffect, useState } from 'react';
import './App.css'

function App() {

  const [advice, setAdvice] = useState("");
  const [counter, setCounter] = useState(0);
  

  const pegarAprendizado = async () => {
    setAdvice("Aguarde...");
    setCounter((valorAtual) => valorAtual + 1);

    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();

    setAdvice(data.slip.advice);
};

    useEffect(() => {
      pegarAprendizado();
    }, []); //sem nada nos [] executa somente 1x
    

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-center">FastFiscal - Brasil</h1>
      <p>Aprendizado do Dia: </p>
      <p>{advice}</p>
      <button
      onClick={pegarAprendizado} 
      className="p-2.5 border border-blue-500 text-blue-500 rounded-lg ,mt-5"
      >
        Outro Aprendizado
        </button>
        <p className="mt-5">Foram dados {counter} aprendizados.</p>
     </div>
  );
}

export default App
