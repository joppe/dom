import * as types from '@apestaartje/types';

import { ComponentOptions } from './ComponentOptions';
import { HTMLCustomElement } from '../../HTMLCustomElement';
import { isValidSelector } from './isValidSelector';

// tslint:disable-next-line function-name no-any
export function Component<T extends types.Constructor<HTMLCustomElement>>(options: ComponentOptions): (target: T) => any {
    if (!isValidSelector(options.selector)) {
        throw new Error(`Invalid CustomElement selector "${options.selector}", always use a "-" in the name of the tag.`);
    }

    const template: HTMLTemplateElement = document.createElement('template');
    const style: string = options.style === undefined ? '' : `<style>${options.style}</style>`;

    // tslint:disable no-inner-html
    template.innerHTML = `
        ${style}
        ${options.template}
    `;

    // tslint:disable-next-line no-any
    return (target: T): any => {
        const customElement: T = class extends target {
            // tslint:disable-next-line no-any
            constructor(...args: any[]) {
                super(...args);

                if (options.useShadowRoot) {
                    this.attachShadow({ mode: 'open' });
                }
            }

            public connectedCallback(): void {
                if (options.useShadowRoot) {
                    (<ShadowRoot>this.shadowRoot).appendChild(template.content.cloneNode(true));
                } else {
                    // console.log(this.appendChild);
                    this.appendChild(template.content.cloneNode(true));
                }

                if (super.connectedCallback) {
                    super.connectedCallback();
                }
            }
        };

        window.customElements.define(options.selector, customElement);

        return customElement;
    };
}
