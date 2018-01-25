[![Build Status](https://travis-ci.org/SodiumFRP/sodium-typescript.svg?branch=master)](https://travis-ci.org/SodiumFRP/sodium-typescript)
[![npm version](https://badge.fury.io/js/sodiumjs.svg)](https://badge.fury.io/js/sodiumjs)
[![Bower version](https://badge.fury.io/bo/sodiumjs.svg)](https://badge.fury.io/bo/sodiumjs)
[![Downloads](http://img.shields.io/npm/dm/sodiumjs.svg)](https://npmjs.org/package/sodiumjs)

# Sodium

A Functional Reactive Programming (FRP) library for TypeScript/JavaScript

## Prerequisite: Node.js

Install [Node.js® and npm](https://nodejs.org/en/download/current/) if they are not already on your machine.

## Installation

### via NPM
```bash
$> npm install sodiumjs
$> npm install -g sodiumjs
```

### via Yarn
```bash
$> yarn add sodiumjs
$> yarn global add sodiumjs
```

### via Bower
```bash
$> bower install sodiumjs
```

### via html include 
```
<script src="https://cdn.jsdelivr.net/npm/sodiumjs/dist/sodium.umd.min.js"></script>
```

_this requires also including [sanctuary-type-classes](https://github.com/sanctuary-js/sanctuary-type-classes) and [typescript-collections](https://github.com/basarat/typescript-collections) dependencies_

## How to use

### Import
```javascript
import { Cell } from 'sodiumjs';
```
### ES6

```javascript
const c = new Cell(12);
```

### TypeScript
```javascript
const c = new Cell<number>(12);
```

### In a browser

```html
<script>
    var cell = new Sodium.Cell(12);
</script>
```

## Development

The usual `npm run build/test/clean` commands are available to produce the distribution package.

However, a more comfortable iteration style may be using the the live integration testing approach:

1. cd `integration`
2. `npm run dev:auto-reload` (or just `npm run dev` without live reloading)

This starts up a local development server and showcases integration with a [webpack](https://webpack.github.io/) app. 

Changes to the core lib are then seen live since it uses a local alias rather than reference the lastest build or distribution of the library

Sodium library code is in [src/lib](src/lib)

Packaging/tree-shaking and bundling of the library is done with [Rollup](https://rollupjs.org/)

Testing is via [Jest](https://facebook.github.io/jest/)

## Examples

There are examples both in the ```examples/book``` folder, (which is a git submodule, although this will change in future). Use a standard ```git clone --recursive https://github.com/SodiumFRP/sodium-typescript``` command in order to fetch them.

Here are some demos from the community you can try in your browser: 

* [Petrol Pump](https://huanhulan.github.io/petrol_pump/)
* [Reactive Drawing Pad](https://github.com/graforlock/reactive-drawing-pad/tree/master)
* [Misc Playground (drum machine, animation, etc.)](https://github.com/dakom/sodium-typescript-playground)

## License

Distributed under [BSD 3-Clause](https://opensource.org/licenses/BSD-3-Clause)

## Announcement

Stephen Blackheath, 9 Jul 2016

I am very happy to announce that the Typescript implementation of Sodium is ready!

It features a newly developed scheme for memory management, which was needed
because Javascript has no finalizers. Memory management in Sodium is 100%
automatic.

This scheme imposes one small requirement on the API: You must declare any Sodium
objects held inside closures using wrapper functions lambda1, lambda2 ..
lambda6 - depending on the number of arguments that the closure has.
These take a second argument, which is a list of the Sodium objects contained
in the context of the closure. For example:

  csw = csw_str.map(lambda1(sw => sw == "sa" ? sa : sb, [sa, sb])),

This allows Sodium to track all dependencies. There are some limitations to this
scheme - for example, it can't track dependencies if you poke arbitrary Sodium
objects into a StreamSink, but I think these should not affect any normal usages.
Time will tell.

CHANGELOG

1.0.5    Migrate build environment over to fuse-box. 
         Begin adding fantasy-land compatibility
         
1.0.0    Add snapshot3(), snapshot4(), snapshot5() and snapshot6().
         Fix a serious bug in TimerSystem where timers sometimes don't fire.
