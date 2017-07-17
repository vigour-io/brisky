const App = ({ title = 'fun', hello: bye, gur = { hello: true } }) => {
  return <div>
    <h1>X{'!bye' + title + bye.toUpperCase() + bye.toLowerCase() + 'bye!'}X</h1>
  </div>
}

module.exports = App
