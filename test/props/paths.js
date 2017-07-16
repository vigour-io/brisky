const App = ({ field }) => {
  return <div>
    <h1>X{field.nested}X</h1>
    <h2>{field.a.b.c.d.toUpperCase()}</h2>
    <h3>{field}</h3>
    <h4>X{field.nested.a + '!' + field.nested.a}</h4>
    <h5>{field.nested.a + field.x.y.z}</h5>
  </div>
}

module.exports = App
