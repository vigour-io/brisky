const App = (props) => {
  return <div>
    <h1>{props.nested}</h1>
    <h2>{props}</h2>
    <div>{props.bla}</div>
  </div>
}

module.exports = App
