const { create, get, puid, compute } = require('brisky-struct')
// const { render, isStruct, calc, addSubscription, createTransformer, findParent, parent } = require('./framework')
// // ------------------------------------------------
// // const App = require('./jsx.transpiled.js')
// // ------------------------------------------------
// // components will become objects and map properties
// const s = create({ title: 'hello' })

// /*
// const Thing = props => {
//   return <div>*{props.title}*</div>
// }

// const List = props => {
//   return <div>{props.children}</div>
// }

// // rest operator ({ click, ...rest })
// // support this later

// // const Spread = ({ title, ...rest }) => {
// // this is pretty usefull to support
// //   return <div {...rest}>lulz</div>
// // }



// const App = ({ title, items }) => {
//   return <div>{title}
//     <List>
//       <Thing title={title + !} />
//     </List>
//     <ItemList items={items}/>
//   </div>
// }

// cont Switch = ({ title }) => title === 'bla' ? <Thing title={title} : false

// // need to handle that function
// const TodoList = ({ list }) => {
//   return <div>
//     {list.map(props => <Thing title={props.title} />)} // need to add a prop mapper on the component
//     {list.map(props => Thing)} // this is the one currently used
//   </div>
// }

// */

// // make a framework create function

// // create special functions for the hub (add subscription vs mapping it?)

// // so it will just send the components to the hub

// // and have a special 'lean add-subscription function'

// // step 1 can be just sending it up every time -- but need to send empty fields for any then

// const ThingElement = document.createElement('div')
// ThingElement.style.margin = '10px'
// ThingElement.style.width = '50px'
// ThingElement.style.height = '50px'

// // missing the same type of component on the same
// const Thing = {
//   props: {
//     // these boys need a transformer
//     title1: (s, subs, tree, id) => {
//       // need to get transformer here
//       tree._p._[puid(s.parent()) + id].childNodes[0].nodeValue = compute(s)
//     }
//   },
//   element: ThingElement,
//   id: 321120, // filename + var name (hash)
//   create (props, subscription, tree, id) {
//     var title

//     if (isStruct(props)) {
//       title = get(props, 'title', {})
//     } else {
//       title = props.title
//     }

//     // hard styles used clone node
//     const element = this.element.cloneNode(true)
//     const text = document.createTextNode(calc(title))
//     element.appendChild(text)
//     if (isStruct(title)) {
//       addSubscription(this, title, subscription, title.key, { val: 'shallow' }, false, false, false, 'title1')
//     }
//     // never remove but dont add it multiple times so need some kind of information what / where you are
//     return element
//   }
// }

// // const List = {
// //   id: 321121, // filename + var name (hash)
// //   create (props, subscription, tree) {
// //     // children
// //     var children
// //     if (isStruct(props)) {
// //       children = get(props, 'children', {})
// //     } else {
// //       children = props.children
// //     }

// //     const element = document.createElement('div')

// //     if (isStruct(children)) {
// //       console.log('dont support children in this way....')
// //     }

// //     if (children) {
// //       for (let i = 0; i < children.length; i++) {
// //         element.appendChild(children[i])
// //       }
// //     }

// //     return element
// //   }
// // }

// const TodoListElement = document.createElement('div')
// TodoListElement.style.display = 'flex'
// TodoListElement.style.flexDirection = 'row'
// TodoListElement.style.flexWrap = 'wrap'

// const TodoList = {
//   id: 321124, // filename + var name (hash)
//   element: TodoListElement,
//   create (props, subscription, tree, id) {
//     // children
//     var list
//     if (isStruct(props)) {
//       list = get(props, 'list', {})
//     } else {
//       list = props.list
//     }

//     // console.error(props)

//     const element = this.element.cloneNode(true)

//     if (isStruct(list)) {
//       // if in children do something like this
//       const key = '$any' + list.key + id
//       const endpoint = [ key ]
//       addSubscription(
//         this,
//         list.struct,
//         subscription,
//         list.key,
//         { [key]: { val: 'shallow' } },
//         Thing,
//         true,
//         endpoint,
//         id
//       )
//     } else if (list.isTransformer) {
//       // addSubscription(this, list.struct, subscription, list.struct.key, { val: 'shallow' }, s => {
//       //   text.nodeValue = list.transform(s.compute())
//       // })
//     } else {

//     }
//     return element
//   }
// }

// // add the default operator for title
// // what about 'add subscription' for things like any etc
// // best is to have this running in the hub as well for addSubscription stuff
// // then it does not need to get send at all
// // just have the app in the hub and done

// const App = {
//   id: 321123, // filename + var name (hash)
//   create (props, subscription, tree, id) {
//     var items
//     if (isStruct(props)) {
//       items = props.get('items', {})
//     } else if (props.isTransformer) {
//       // console.log('passed some transforms')
//     } else {
//       items = props.items
//     }

//     // use a function for this
//     const element = document.createElement('div')
//     // const text = document.createTextNode(calc(title))
//     // element.appendChild(text)
//     // text

//     // if (isStruct(title)) {
//     //   addSubscription(this, title, subscription, title.key, { val: 'shallow' }, s => {
//     //     text.nodeValue = s.compute()
//     //   })
//     // } else if (title.isTransformer) {
//     //   addSubscription(this, title.struct, subscription, title.struct.key, { val: 'shallow' }, s => {
//     //     text.nodeValue = title.transform(s.compute())
//     //   })
//     // }

//     // element.appendChild(List.create({
//     //   children: [
//     //     Thing.create({ title: createTransformer(title, val => val + '!') }, subscription, tree)
//     //   ]
//     // }, subscription, tree))

//     // needs if struct block
//     // create component on struct -- can also go to 'new' also need to know if a subscription is allrdy added _: { [id] }
//     //

//     const key = id + TodoList.id
//     const c = TodoList.create({
//       list: items
//     }, subscription, tree, key)
//     if (!tree._) tree._ = {}
//     tree._[key] = c
//     element.appendChild(c)

//     return element
//   }
// }

// // ------------------------------------------------
// const app = render(App, s)

// var i = 4e3
// var arr = []
// while (i--) {
//   arr.push({
//     title: i
//   })
// }

// setTimeout(() => {
//   var d = Date.now()
//   s.set({
//     title: 'boeloe!',
//     items: arr
//   })
//   console.log('create', Date.now() - d, 'ms')
// }, 1e3)

// // setTimeout(() => {
// //   var d = Date.now()
// //   s.set({
// //     title: 'boeloe!',
// //     items: [ { title: 'x!' + Math.random() }, { title: 'y!' + Math.random() } ]
// //   })
// //   console.log('update', Date.now() - d, 'ms')
// // }, 2500)

// var cnt = 0
// var total = 0

// const x = () => {
//   cnt++
//   var d = Date.now()
//   var i = 4e3
//   var arr = []
//   while (i--) {
//     arr.push({
//       title: i + cnt
//     })
//   }
//   s.set({
//     title: 'boeloe!',
//     items: arr
//   })
//   total += Date.now() - d
//   // console.log('update', Date.now() - d, 'ms')
//   global.requestAnimationFrame(x)
// }

// setTimeout(() => {
//   x()
// }, 2500)

// const div = document.createTextNode('div')
// document.body.appendChild(div)

// setInterval(() => {
//   div.nodeValue = total / cnt + 'ms'
// }, 1000)

// document.body.appendChild(app)

const state = create({
  title: 'hello'
})

const tree = {}

const render = (s, type, subs, tree) => {
  console.log('lulz')
  if (subs._) {
    if (type === 'new' && subs._.new) {
      if (!tree._) tree._ = {}
      subs._.new(subs, tree, s)
    } else if (type === 'update') {
      subs._.update(subs, tree, s)
    } else if (type === 'remove') {
      // not there
    }
  }
}

const findParent = (tree, id) => {
  var p = tree
  while (p) {
    if (p._ && p._[id]) {
      return p._[id]
    }
    p = tree._p
  }
}

state.subscribe({
  val: 'shallow',
  title: {
    val: 'shallow',
    _: {
      // also need remove ---
      update: (subs, tree, s) => {
        const val = s.compute()
        const node = findParent(tree, 2)
        const node2 = findParent(tree, 5)
        if (node) {
          node.nodeValue = val
        }
        if (node2) {
          node2.nodeValue = val + '!'
        }
      }
    }
  },
  _: {
    new: (subs, tree, s) => {
      const $0App = tree._[0] = document.createElement('div')

      const $1AppDiv = document.createElement('div')
      const $2AppDivText = tree._[2] = document.createTextNode(s.get('title', '').compute())
      const $3AppList = document.createElement('div')
      const $4AppListThing = document.createElement('div')
      const $5AppListThingText = tree._[5] = document.createTextNode(s.get('title', '').compute())
      const $6AppThing = document.createElement('div')
      const $7AppThingText = document.createTextNode('hello!')
      $0App.appendChild($1AppDiv)

      $1AppDiv.appendChild($2AppDivText)

      $0App.appendChild($3AppList)
      $3AppList.appendChild($4AppListThing)
      $4AppListThing.appendChild($5AppListThingText)

      $1AppDiv.appendChild($6AppThing)
      $6AppThing.appendChild($7AppThingText)
    }
  }
}, render, false, tree)

document.body.appendChild(tree._[0])
