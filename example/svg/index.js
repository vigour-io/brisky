'use strict'
require('../style.css')
const benchmark = require('../benchmark')
const svgNS = 'http://www.w3.org/2000/svg'
const app = {
  key: 'app',
  main: {
    svg: {
      $: 'collection',
      $any: true,
      css: null,
      namespace: svgNS,
      node: 'svg',
      props: {
        width: 1000,
        height: 1000
      },
      Child: {
        namespace: svgNS,
        node: 'circle',
        css: null,
        props: {
          cx: {
            $: 'i',
            $transform (val) { return Math.sin(val / 30) * (val / 2) + 250 }
          },
          cy: {
            $: 'i',
            $transform (val) { return Math.cos(val / 30) * (val / 2) + 250 }
          },
          r: { $: 'i', $transform (val) { return val / 50 + 1 } },
          'stroke-width': 1,
          fill: 'red',
          stroke: 'black'
        }
      }
    }
  }
}

benchmark.loop(500, app, (i, cnt) => { return { i: i } })
