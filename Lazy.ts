/**
 * A representation for a value that may not be available until the current
 * transaction is closed.
 */
export class Lazy<A> {
    constructor(f : () => A) {
        this.f = f;
    }

    private f : () => A;

    /**
     * Get the value if available, throwing an exception if not.
     * In the general case this should only be used in subsequent transactions to
     * when the Lazy was obtained.
     */
    get() : A {
        return this.f();
    }

    /**
     * Map the lazy value according to the specified function, so the returned Lazy reflects
     * the value of the function applied to the input Lazy's value.
     * @param f Function to apply to the contained value. It must be <em>referentially transparent</em>.
     */
    map<B>(f : (a : A) => B) {
        return new Lazy<B>(() => { return f(this.f()); });
    }

	/**
	 * Lift a binary function into lazy values, so the returned Lazy reflects
     * the value of the function applied to the input Lazys' values.
	 */
    lift<B,C>(b : Lazy<B>, f : (a : A, b : B) => C) : Lazy<C> {
        return new Lazy<C>(() => { return f(this.f(), b.f()); });
    }

	/**
	 * Lift a ternary function into lazy values, so the returned Lazy reflects
     * the value of the function applied to the input Lazys' values.
	 */
    lift3<B,C,D>(b : Lazy<B>, c : Lazy<C>, f : (a : A, b : B, c : C) => D) : Lazy<D> {
        return new Lazy<D>(() => { return f(this.f(), b.f(), c.f()); });
    }

	/**
	 * Lift a quaternary function into lazy values, so the returned Lazy reflects
     * the value of the function applied to the input Lazys' values.
	 */
    lift4<B,C,D,E>(b : Lazy<B>, c : Lazy<C>, d : Lazy<D>, f : (a : A, b : B, c : C, d : D) => E) : Lazy<E> {
        return new Lazy<E>(() => { return f(this.f(), b.f(), c.f(), d.f()); });
    }
}
