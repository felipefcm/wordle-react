
export type EventCallback = (...args: any[]) => void | Promise<void>

export type Subscription = {
  id: number
  callback: EventCallback
}

export enum EventType {
  KEYPRESS = 'keypress',
  ATTEMPT_MADE = 'attempt_made',
  ATTEMPT_RESULT = 'attempt_result',
  GAME_OVER = 'game_over',
}

export class EventBus {

  private debug: boolean
  private subscribers: { [event: string]: Subscription[] } = {}

  constructor(debug = false) {
    this.debug = debug
  }

  public subscribe(event: EventType, callback: EventCallback) {
    this.subscribers[event] ||= []

    const callbackInfo = {
      id: Math.trunc(Math.random() * Number.MAX_SAFE_INTEGER),
      callback
    }

    this.subscribers[event].push(callbackInfo)
    return callbackInfo.id
  }

  public unsubscribe(event: EventType, subId: number) {
    if (!this.subscribers[event]) return
    this.subscribers[event] = this.subscribers[event].filter(sub => sub.id !== subId)
  }

  public publish(event: EventType, ...args: unknown[]) {
    if (this.debug) console.log(`event-bus: publish '${event}'`, args)

    if (!this.subscribers[event]) return
    this.subscribers[event].forEach(sub => sub.callback(...args))
  }
}
