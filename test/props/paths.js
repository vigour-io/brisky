const App = ({ field }) => {
  return <div>
    <h1>X{field.nested}X</h1>
    <h2>{field.a.b.c.toUpperCase()}</h2>
    <h3>{field}</h3>
  </div>
}

module.exports = App
