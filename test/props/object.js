const App = (props) => {
  return <div>
    <div>{props.bla + '!' + props.bla + props.x.y.z}</div>
  </div>
}

/*
 <h1>{props.nested}</h1>
    <h2>{props}</h2>
        <div>{props.bla.bax + '!' + props.blurf + props.x.y.z}</div>

*/

module.exports = App
