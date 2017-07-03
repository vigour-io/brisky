const Thing = props => {
  return <div>{props.title}</div>
}

const List = props => {
  return <div>{props.children}</div>
}

// rest operator ({ click, ...rest })
// support this later

// const Spread = ({ title, ...rest }) => {
// this is pretty usefull to support
//   return <div {...rest}>lulz</div>
// }

const App = ({ title }) => {
  return <div>{title}
    <List>
      <Thing title={title} />
    </List>
  </div>
}

module.exports = App
