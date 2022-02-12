
export type EventCallback = (...args: any[]) => void | Promise<void>

export type Subscription = {
  id: number
  callback: EventCallback
}

export class EventBus {

  private subscribers: { [event: string]: Subscription[] } = {}

  public subscribe(event: string, callback: EventCallback) {
    this.subscribers[event] ||= []

    this.subscribers[event].push({
      id: Math.random() * Number.MAX_SAFE_INTEGER,
      callback
    })
  }

  public unsubscribe(event: string, subId: number) {
    if (!this.subscribers[event]) return
    this.subscribers[event] = this.subscribers[event].filter(sub => sub.id !== subId)
  }

  public publish(event: string, ...args: any[]) {
    if (!this.subscribers[event]) return
    this.subscribers[event].forEach(sub => sub.callback(...args))
  }
}
