# Sodium

A Functional Reactive Programming (FRP) library for TypeScript/JavaScript

## Prerequisite: Node.js

Install [Node.js® and npm](https://nodejs.org/en/download/current/) if they are not already on your machine.

## Installation

Warning: The library is still pending for release to npm and bower

via NPM
```
$> npm install sodiumjs
$> npm install -g sodiumjs
```

via Bower
```
$> bower install sodiumjs
```

## How to use

ES6
```
TBA
```

Typescript Import
```
TBA
```

In a browser, use the UMD format `sodium.umd.js` from `dist/lib` directory
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
