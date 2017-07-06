const Thing = props => {
  return <div>{props.title}!</div>
}

const List = props => {
  return <div>{props.children}</div>
}

const App = ({ title }) => {
  return <div>{title}
    <List>
      <Thing title={title} />
    </List>
    <Thing title='hello' />
  </div>
}

// render(App, state)

module.exports = App

/*
// file name + Component name
// --> App.div   <div App />
<div Thing />
</div<
*/
