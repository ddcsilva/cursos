const TemplateExpessions = () => {
  const name = "Danilo";
  const age = 35;
  const usuario = {
    name: "Danilo",
    position: "Software Engineer",
  };
  return (
    <div>
      <h2>Template Expressions</h2>
      <p>Olá, me chamo {name}</p>
      <p>É possível fazer cálculos. Exemplo: 2 + 2 = {2 + 2}</p>
      <p>
        É possível acessar objetos. Exemplo: Usuário: {usuario.name} / Profissão: {usuario.position}
      </p>
      <p>
        Daqui 5 anos o {name} terá {age + 5} anos.
      </p>
    </div>
  );
};

export default TemplateExpessions;
