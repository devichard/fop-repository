
const Equipe = (props) => {
  return (
    <div>
      <Sobre nome={props.nome} cargo={props.cargo} idade={props.idade} />
      <Social fb={props.facebook} />
      <hr/>
    </div>
  );
}

const Sobre = (props) => {
  return (
    <div>
      <h2>Olá! Me chamo {props.nome}.  </h2>
      <h3>Meu cargo é: {props.cargo} </h3>
      <h3>E tenho {props.idade} anos </h3>
    </div>
  );
}

const Social = (props) => {
  return (
    <div>
      <a href={props.fb}>Facebook </a>
      <a>Instagram </a>
      <a>LinkedIn </a>
    </div>
  );
}


function App() {
  return (
    <div>
      <h1>Conheça nossa equipe</h1>
      <Equipe nome="Arthur" cargo="Desenvolvedor" idade="22" 
          facebook="https://facebook.com.br" />
      <Equipe nome="Larissa" cargo="Administrativo" idade="22" />
      <Equipe nome="Mariana" cargo="Copa" idade="22" />
    </div>
  );
}

export default App;