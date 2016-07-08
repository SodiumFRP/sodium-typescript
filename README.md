Sodium Functional Reactive Programming (FRP) system for Typescript/Javascript

Dependencies:

  npm install typescript
  npm install typescript-collections

----

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
