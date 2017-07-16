const App = (props) => {
  return <div>
    <div>{props.bla + '!' + props.blurf}</div>
  </div>
}

module.exports = App

/*
    <h1>{props.nested}</h1>
    <h2>{props}</h2>
    <div>{props.bla + '!' + props.bla}</div>
*/
