import {Vertex} from './Vertex';
import * as Collections from 'typescript-collections';

export class Entry
{
  constructor(rank: Vertex, action: () => void)
  {
    this.rank = rank;
    this.action = action;
    this.seq = Entry.nextSeq++;
  }

  private static nextSeq: number = 0;
  rank: Vertex;
  action: () => void;
  seq: number;

  toString(): string
  {
    return this.seq.toString();
  }
}

export class Transaction
{
  public static currentTransaction: Transaction = null;
  private static onStartHooks: (() => void)[] = [];
  private static runningOnStartHooks: boolean = false;

  constructor() {}

  inCallback: number = 0;
  private toRegen: boolean = false;

  requestRegen(): void
  {
    this.toRegen = true;
  }

  prioritizedQ: Collections.PriorityQueue<Entry> = new Collections.PriorityQueue<Entry>((a, b) =>
  {
    // Note: Low priority numbers are treated as "greater" according to this
    // comparison, so that the lowest numbers are highest priority and go first.
    if (a.rank.rank < b.rank.rank) return 1;
    if (a.rank.rank > b.rank.rank) return -1;
    if (a.seq < b.seq) return 1;
    if (a.seq > b.seq) return -1;
    return 0;
  });
  private entries: Collections.Set<Entry> = new Collections.Set<Entry>((a) => a.toString());
  private sampleQ: Array<() => void> = [];
  private lastQ: Array<() => void> = [];
  private postQ: Array<() => void> = null;

  prioritized(target: Vertex, action: () => void): void
  {
    const e = new Entry(target, action);
    this.prioritizedQ.enqueue(e);
    this.entries.add(e);
  }

  sample(h: () => void): void
  {
    this.sampleQ.push(h);
  }

  last(h: () => void): void
  {
    this.lastQ.push(h);
  }

  /**
   * Add an action to run after all last() actions.
   */
  post(childIx: number, action: () => void): void
  {
    if (this.postQ == null)
      this.postQ = [];
    // If an entry exists already, combine the old one with the new one.
    while (this.postQ.length <= childIx)
      this.postQ.push(null);
    const existing = this.postQ[childIx],
      neu =
        existing === null ? action
          : () =>
        {
          existing();
          action();
        };
    this.postQ[childIx] = neu;
  }

  // If the priority queue has entries in it when we modify any of the nodes'
  // ranks, then we need to re-generate it to make sure it's up-to-date.
  private checkRegen(): void
  {
    if (this.toRegen)
    {
      this.toRegen = false;
      this.prioritizedQ.clear();
      const es = this.entries.toArray();
      for (let i: number = 0; i < es.length; i++)
        this.prioritizedQ.enqueue(es[i]);
    }
  }

  public isActive() : boolean
  {
    return Transaction.currentTransaction ? true : false;
  }

  close(): void
  {
    while(true)
    {
      while (true)
      {
        this.checkRegen();
        if (this.prioritizedQ.isEmpty()) break;
        const e = this.prioritizedQ.dequeue();
        this.entries.remove(e);
        e.action();
      }

      const sq = this.sampleQ;
      this.sampleQ = [];
      for (let i = 0; i < sq.length; i++)
        sq[i]();

      if(this.prioritizedQ.isEmpty() && this.sampleQ.length < 1) break;
    }

    for (let i = 0; i < this.lastQ.length; i++)
      this.lastQ[i]();
    this.lastQ = [];
    if (this.postQ != null)
    {
      for (let i = 0; i < this.postQ.length; i++)
      {
        if (this.postQ[i] != null)
        {
          const parent = Transaction.currentTransaction;
          try
          {
            if (i > 0)
            {
              Transaction.currentTransaction = new Transaction();
              try
              {
                this.postQ[i]();
                Transaction.currentTransaction.close();
              }
              catch (err)
              {
                Transaction.currentTransaction.close();
                throw err;
              }
            }
            else
            {
              Transaction.currentTransaction = null;
              this.postQ[i]();
            }
            Transaction.currentTransaction = parent;
          }
          catch (err)
          {
            Transaction.currentTransaction = parent;
            throw err;
          }
        }
      }
      this.postQ = null;
    }
  }

  /**
   * Add a runnable that will be executed whenever a transaction is started.
   * That runnable may start transactions itself, which will not cause the
   * hooks to be run recursively.
   *
   * The main use case of this is the implementation of a time/alarm system.
   */
  static onStart(r: () => void): void
  {
    Transaction.onStartHooks.push(r);
  }

  public static run<A>(f: () => A): A
  {
    const transWas: Transaction = Transaction.currentTransaction;
    if (transWas === null)
    {
      if (!Transaction.runningOnStartHooks)
      {
        Transaction.runningOnStartHooks = true;
        try
        {
          for (let i = 0; i < Transaction.onStartHooks.length; i++)
            Transaction.onStartHooks[i]();
        }
        finally
        {
          Transaction.runningOnStartHooks = false;
        }
      }
      Transaction.currentTransaction = new Transaction();
    }
    try
    {
      const a: A = f();
      if (transWas === null)
      {
        Transaction.currentTransaction.close();
        Transaction.currentTransaction = null;
      }
      return a;
    }
    catch (err)
    {
      if (transWas === null)
      {
        Transaction.currentTransaction.close();
        Transaction.currentTransaction = null;
      }
      throw err;
    }
  }
}


