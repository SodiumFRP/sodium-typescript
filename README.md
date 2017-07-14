[![Build Status](https://travis-ci.org/SodiumFRP/sodium-typescript.svg?branch=master)](https://travis-ci.org/SodiumFRP/sodium-typescript)
[![npm version](https://badge.fury.io/js/sodiumjs.svg)](https://badge.fury.io/js/sodiumjs)
[![Bower version](https://badge.fury.io/bo/sodiumjs.svg)](https://badge.fury.io/bo/sodiumjs)
[![Downloads](http://img.shields.io/npm/dm/sodiumjs.svg)](https://npmjs.org/package/sodiumjs)

# Sodium

A Functional Reactive Programming (FRP) library for TypeScript/JavaScript

## Prerequisite: Node.js

Install [Node.js® and npm](https://nodejs.org/en/download/current/) if they are not already on your machine.

## Installation

### via NPM or Yarn
```
$> npm install sodiumjs
$> npm install -g sodiumjs
$> yarn add sodiumjs
$> yarn global add sodiumjs
```

### via Bower
```
$> bower install sodiumjs
```

## How to use

### ES6
```
import { Cell } from 'sodiumjs';
...
const c = new Cell(12);
```

### TypeScript
```
import { Cell } from 'sodiumjs';
...
const c = new Cell<number>(12);
```

### In a browser
Use the [UMD(Universal Module Definition)](https://github.com/umdjs/umd) format `sodium.umd.js` from `dist/lib` directory

```
<script src="dist/lib/sodium.umd.js"></script>
<script>
    var cell = new Sodium.Cell(12);
    ...
</script>
```

## Build

Build commonjs libraries and UMD library for direct browser usage

```
$> npm run prerelease
```
## Examples

There are examples both in ```examples/basic``` and ```examples/book``` folders, the latter being a git submodule (this will change in future). Use a standard ```git clone --recursive https://github.com/SodiumFRP/sodium-typescript``` command in order to fetch these.

Here's an example you can try in your browser: [Reactive Drawing Pad](https://github.com/graforlock/reactive-drawing-pad/tree/master)

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

1.0.0    Add snapshot3(), snapshot4(), snapshot5() and snapshot6().
         Fix a serious bug in TimerSystem where timers sometimes don't fire.
