declare class EventEmitter {
    private events;
    /**
     * Register an event handler for the given type.
     *
     * @param type - Type of event to listen for, or `"*"` for all events
     * @param handler - Function to call in response to given event
     */
    on(type: string, handler: (event?: any) => void): void;
    /**
     * Remove an event handler for the given type.
     *
     * @param type - Type of event to unregister `handler` from, or `"*"`
     * @param handler - Handler function to remove
     */
    off(type: string, handler: (event?: any) => void): void;
    removeAllListeners(): void;
    /**
     * Invoke all handlers for the given type.
     * If present, `"*"` handlers are invoked after type-matched handlers.
     *
     * @param type - The event type to invoke
     * @param evt - Any value (object is recommended and powerful), passed to each handler
     */
    emit(type: string, ...evt: any[]): void;
}
interface ModalAction {
    /**
     * Type of the action(anchor) button
     */
    type?: 'close' | 'cancel' | 'confirm';
    /**
     * Text content of the action(anchor) button
     */
    label: string;
    /**
     * Class name of the action(anchor) button
     */
    class?: string;
    /**
     * `href` attribute
     */
    redirect?: string;
    /**
     * `target` attribute
     */
    target?: string;
    /**
     * callback function
     */
    callback?: Function;
}
/**
 * Modal classes
 *
 * ```html
 * <div class="host">
 *   <div class="body">
 *   </div>
 *   <div class="backdrop"></div>
 * </div>
 * ```
 */
interface ModalStyle {
    host: string;
    body: string;
    enter: string;
    leave: string;
    backdrop: string;
}
interface ModalConfig {
    /**
     * Mount element
     */
    host?: HTMLElement;
    /**
     * Modal title
     */
    title?: string;
    /**
     * Modal content
     */
    content: string;
    /**
     * Apply animation, require `classes.enter` and `classes.leave`
     */
    animation?: boolean;
    /**
     * Close modal when clicking on backdrop
     */
    autoclose?: boolean;
    /**
     * Class names
     */
    classes?: ModalStyle;
    /**
     * Event type
     */
    event: string;
    /**
     * Action button(anchor) list
     */
    actions: ModalAction[];
}
/**
 * References of the modal elements
 *
 * ```html
 * <body>
 *   <header></header>
 *   <content></content>
 *   <footer></footer>
 * </body>
 * ```
 */
interface ModalElements {
    body?: Element;
    header?: Element;
    content?: Element;
    footer?: Element;
}
/**
 * Modal
 *
 * ### Example
 *
 * ```javascript
 * const modal = new Modal({
 *   host: document.body, // by default
 *   title: 'title',
 *   content:
 *     `<p>click <a data-type="close">here</a> to close.</p>
 *      <p>click <a data-type="cancel">here</a> to cancel.</p>
 *      <p>click <a data-type="confirm">here</a> to confirm.</p>`,
 *   animation: true, // by default
 *   event: 'click', // by default
 *   autoclose: true. // by default
 *   actions: [
 *     { type: 'close', label: 'close' },
 *     { type: 'cancel', label: 'cancel' },
 *     { type: 'confirm', label: 'ok' },
 *     {
 *       label: 'search it',
 *       redirect: 'https://www.google.com/search?q=',
 *       target: '_blank',
 *     },
 *     {
 *       label: 'noop', callback: function (event) {
 *         this.close()
 *       }
 *     },
 *   ],
 * });
 *
 * modal.open().then(() => {});
 * modal.close().then(() => {});
 *
 * modal.on('open', () => {});
 * modal.on('close', () => {});
 * modal.on('cancel', () => {});
 * modal.on('confirm', () => {});
 * ```
 */
export declare class Modal extends EventEmitter {
    private state;
    private host;
    private config;
    el: ModalElements;
    /**
     * Modify the default configuration
     */
    static config(config: ModalConfig, pure?: boolean): ModalConfig;
    /**
     * Cconstructor
     *
     * @param config - ModalConfig
     */
    constructor(config: ModalConfig);
    private render;
    /**
     * Open modal
     *
     * @returns promise
     */
    open(): Promise<void>;
    /**
     * Close modal
     *
     * @returns promise
     */
    close(): Promise<void>;
    /**
     * Destroy instance, remove all listeners
     */
    destroy(): void;
}
export {};