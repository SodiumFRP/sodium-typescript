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

### via [jsDelivr CDN](https://www.jsdelivr.com/package/npm/sodiumjs)
```
<script src="https://cdn.jsdelivr.net/npm/sodiumjs@1/dist/sodium.min.js"></script>
```

## How to use

### ES6
```javascript
import { Cell } from 'sodiumjs';
...
const c = new Cell(12);
```

### TypeScript
```javascript
import { Cell } from 'sodiumjs';
...
const c = new Cell<number>(12);
```

### In a browser

The built files in `dist` use a universal format and can be loaded directly in the browser as-is.

You can either load `sodium.js` (debugging with source maps) or `sodium.min.js` (optimized for production). 

```html
<script src="dist/sodium.min.js"></script>
<script>
    var cell = new Sodium.Cell(12);
    ...
</script>
```

## Development

Sodium library code is in [src/lib](src/lib). Packaging and bundling is all done with [FuseBox](http://fuse-box.org/)

The following list provides various development scenarios in more detail. In short, the recommended flow is:

1. `Dev` - quick iteration while seeing live changes in the browser. Once that's confirmed to work...
2. `Test` - unit tests to confirm that nothing else was broken in the process
3. `Build` - create the final build for distribution
4. `External` - integration test to confirm that the library loads externally, via the distribution build
5. Commit to repo / deploy to npm.

### Dev

```bash
$> npm run dev
```

Iterative developing in a browser environment. Changes to the source in either the Sodium library itself or the browser app code will be recompiled on save.

Note that it currently caches the html markup - dom changes should really be code-driven or be very minimal/static.

Project is in `src/dev` folder, code entry point is `src/dev/DevInit.ts`


### Test - unit

```bash
$> npm run test:unit
```

Runs unit tests against all *.test.ts files in src/tests directory

### Build

```bash
$> npm run build
```

Creates the distribution library (both minified and not), as well as the Typescript definition files. 

Deployments must have run this first so that the `dist` folder is up to date

### Test - external

```bash
$> npm run test:external
```

 Verifies the scenario of loading sodium in the browser as an external library. This does not watch for changes to sodium itself - it's only for integration testing against the final build. Therefore, you _must_ `build` before running this.

Project is in `src/tests/external-browser` folder.

## Examples

There are examples both in the ```examples/book``` folder, (which is a git submodule, although this will change in future). Use a standard ```git clone --recursive https://github.com/SodiumFRP/sodium-typescript``` command in order to fetch them.

Here are some demos from the community you can try in your browser: 

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
