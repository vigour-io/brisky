// const App = props => <Blurf bla={props.title} />

// const App = (props = { title: 'fun' }) => <Blurf bla={props.title} />

const App = ({ title = 'fun', hello: bye, gur = { hello: true } }) => {
  return <div>
    <h1>X{'!bye' + bye.toUpperCase() + bye.toLowerCase() + 'bye!'}X</h1>
  </div>
}

/*
 <h1>bye{bye.toUpperCase()}!</h1>
    <h2>hello</h2>
    <h3>{'hello'}</h3>
*/

module.exports = App

// const App = ({ title = 'fun', hello, gur = { hello: true } }) => {
//   if (title === 'fun') {
//     return <div>gurrr!</div>
//   }
//   return <div>{title}</div>
// }

// const App = ({ title = 'fun', hello, gur = { hello: true } }) => {
//   return title === 'fun' ? <div>{title}</div> : <div>jurrrf</div>
// }

// const App = ({ title = 'fun', hello, gur = { hello: true } }) =>
//   title === 'fun'
//     ? <div>{title}</div>
//     : <div>jurrrf</div>

// const App = ({ title = 'fun', hello, gur = { hello: true } }) =>
//   title === 'fun' && <div>{title}</div>

// this whole block has to be taken over
// pretty complex subscription

// if (title === 'fun') {
//     if (gur === 'smur') {
//       return <div>{title}</div>
//     } else {
//       if (hello.indexOf('smur') === 0) {
//         return <div>{hello}</div>
//       } else {
//         return <div>wtf wtf</div>
//       }
//     }
//   } else {
//     return <div>!!!!</div>
//   }

// const App = ({ title = 'fun', hello, gur = { hello: true } }) => {
//   if (title === 'fun') {
//     if (gur === 'smur') {
//       return <div>{title}</div>
//     } else {
//       if (hello.indexOf('smur') === 0) {
//         return <div>{hello}</div>
//       } else {
//         return <div>wtf wtf</div>
//       }
//     }
//   } else {
//     return <div>!!!!</div>
//   }
// }

// const App = props => props.title === 'fun'
//    ? <div>fun</div>
//     : props.gur === 'smur'
//          ? <div{props.title}</div>
//            : <div>{props.rurs}</div>

// // const App = ({ title = 'fun', hello, gur = { hello: true } }) => {
// //   if (title === 'fun') {
// //     return <div>{title}</div>
// //   }
// // }

 // const App = ({ title: turd }) => {
 //   return <div>{turd}</div>
 // }
