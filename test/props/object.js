const App = (props) => {
  return <div>
    <h1>{props.nested}</h1>
    <h2>{props}</h2>
    <div>{props.bla + '!' + props.bla + props.x.y.z}</div>
    <div>yuzi{props.bla.bax + '!' + props.blurf + props.x.y.z}</div>
  </div>
}

module.exports = App
