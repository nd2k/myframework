class EventBus {
  /**
   * Initialize a new event bus instance.
   */
  constructor() {
    this.eventBus = document.createElement('eventbus');
  }

  /**
   * Add an event listener.
   */
  addEventListener(event, callback) {
    this.eventBus.addEventListener(event, callback);
  }

  /**
   * Remove an event listener.
   */
  removeEventListener(event, callback) {
    this.eventBus.removeEventListener(event, callback);
  }

  /**
   * Dispatch an event.
   */
  dispatchEvent(event, detail = {}) {
    this.eventBus.dispatchEvent(new CustomEvent(event, { detail }));
  }
}

let eventBus = new EventBus();

export default eventBus;
