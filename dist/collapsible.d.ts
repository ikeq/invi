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
interface CollapsibleStyle {
    /**
     * Class name which applied to the actived element
     */
    active: string;
}
interface CollapsibleConfig {
    /**
     * CSS selectors for quering title and content element
     */
    selectors?: {
        title?: string;
        content?: string;
    };
    /**
     * Class names
     */
    classes?: CollapsibleStyle;
    /**
     * Event type
     */
    event?: string;
    /**
     * Accordion mode
     */
    accordion?: boolean;
    /**
     * Apply height change to DOM for animation propose
     */
    useHeight?: boolean;
    /**
     *  Indexs of items which need to be expanded after initialization
     */
    indexes?: number[];
}
interface CollapsibleSnapshot {
    /**
     * current collapsed/expanded title element
     */
    title: HTMLElement;
    /**
     * current collapsed/expanded content element
     */
    content: HTMLElement;
    /**
     * index
     */
    index: number;
}
/**
 * Collapsible
 *
 * ### Example
 *
 * ```html
 * <section id="collapse">
 *   <div>
 *     <header>title 1</header>
 *     <article>content 1</article>
 *   </div>
 *   <div>
 *     <header>title 2</header>
 *     <article>content 2</article>
 *   </div>
 *   <div>
 *     <header>title 3</header>
 *     <article>content 3</article>
 *   </div>
 * </section>
 * ```
 *
 * ```javascript
 * const collapsible = new Collapsible(document.getElementById('collapse'), {
 *   selectors: {
 *     title: 'header', // by default
 *     content: 'article' // by default
 *   },
 *   event: 'click', // by default
 *   useHeight: true, // by default
 *   classes: { active: 'active' },
 *   accordion: true,
 *   indexes: [1],
 * });
 * collapsible.on('collapse', (title, content, index) => {});
 * collapsible.on('expand', (title, content, index) => {});
 * ```
 */
export declare class Collapsible extends EventEmitter {
    host: HTMLElement;
    private config;
    private items;
    /**
     * Modify the default configuration
     */
    static config(config: CollapsibleConfig, pure?: boolean): CollapsibleConfig;
    /**
     * Cconstructor
     *
     * @param element -
     * @param config - CollapsibleConfig
     */
    constructor(element: HTMLElement, config?: CollapsibleConfig);
    /**
     * Toggle display the specified item
     *
     * @param index -
     * @returns promise
     */
    toggle(index: number): Promise<CollapsibleSnapshot>;
    /**
     * Collapse the specified item
     *
     * @param index -
     * @param directly - collapse directly without animation (synchronize the operation)
     * @returns return a promise if directly is negative
     */
    collapse(index: number, directly?: boolean): Promise<CollapsibleSnapshot> | void;
    /**
     * Expand the specified item
     *
     * @param index
     * @param directly - expand directly without animation (synchronize the operation)
     * @returns return a promise if directly is negative
     */
    expand(index: number, directly?: boolean): Promise<CollapsibleSnapshot> | void;
    /**
     * Refresh list
     *
     * @param reset - rest status using initial configuration
     * @returns promise
     */
    refresh(reset: boolean): void;
    /**
     * Destroy instance, remove all listeners
     */
    destroy(): void;
}
export {};