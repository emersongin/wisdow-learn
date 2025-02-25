export type Listener<T = any> = (data: T) => void;

export default class EventBus {
  private events: Map<string, Listener[]> = new Map();

  on<T>(event: string, listener: Listener<T>): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(listener);

    return () => this.off(event, listener);
  }

  off<T>(event: string, listener: Listener<T>): void {
    if (!this.events.has(event)) return;
    this.events.set(
      event,
      this.events.get(event)!.filter(l => l !== listener)
    );
  }

  emit<T>(event: string, data: T): void {
    if (!this.events.has(event)) return;
    this.events.get(event)!.forEach(listener => listener(data));
  }

  clear(event: string): void {
    this.events.delete(event);
  }
}