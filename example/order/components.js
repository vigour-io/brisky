'use strict'
exports.components = {
  basic: {
    class: 'basic-item',
    Child: { class: 'basic-item' },
    first: {
      $: 'first',
      text: { $: 'text' },
      bottom: { type: 'text', val: ' | static-second' }
    },
    second: { text: 'static-second' }
  },
  texts: { Child: { type: 'text' } },
  complex: {
    class: 'complex-item',
    first: {
      $: 'first',
      class: 'nested',
      a: {
        Child: { class: 'basic-item' },
        dynamic: { text: { $: 'text' } },
        static: {
          text: 'static-second',
          on: {
            click (e) {
              e.target.style.border = '1px dashed white'
              setTimeout(() => {
                e.target.style.border = 'inherit'
              }, 100)
            }
          }
        }
      }
    },
    second: {
      $: 'second',
      class: 'nested',
      a: {
        a: { text: { $: 'text' } }
      }
    },
    title: { text: 'context' },
    subtitle: { text: 'static & state order' },
    nested: {
      a: {
        a: { text: { $: 'title' } }
      }
    },
    symbol: {},
    symbol2: {
      class: 'symbol',
      order: -1
    }
  },
  deep: {
    class: 'complex-item',
    symbol: {},
    title: { text: 'deep context' },
    nested: {
      first: {
        type: 'basic',
        properties: { texts: { type: 'texts' } },
        texts: [
          '-',
          {
            $: 'first.text',
            $transform (val) {
              return val || 'first removed'
            }
          },
          '-'
        ],
        deep: {
          type: 'basic',
          first: {
            $: 'second'
          }
        }
      }
    },
    footer: {
      symbol2: { class: 'symbol' }
    },
    complex: { type: 'complex' }
  }
}
