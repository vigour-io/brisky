// something really hard -- parse the relative paths in subscriptions
class Prop {
  constructor (type, val) {
    // type can be
    // child, struct, raw, ref
    // raw types can allways be inlined
    // allways has .val -- for a state type thats the field
    // when ref you can also get things like this
    // type: 'reference',
    // val: { $title: { type: 'struct', val: [ 'title' ] } , $id: { type: 'struct', val: [ 'root', 'user', 'id' ] } }
    // can also get expression field expressions chain over holders / refs
    // expression: {
    //.   type: 'inline',
    //    val: $title + '!' + $id
    //    val: $val + '!' // if val is used means use val straight
    // }
    // expresion and raw is never really a thing -- if expresion on raw just inline it and remove expresion
  }
}
