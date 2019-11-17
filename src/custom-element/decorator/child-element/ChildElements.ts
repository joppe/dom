// tslint:disable-next-line function-name
export function ChildElements(selector: string): PropertyDecorator {
    return (target: HTMLElement, propertyName: string): void => {
        Object.defineProperty(
            target,
            propertyName,
            {
                enumerable: true,
                // tslint:disable-next-line no-function-expression
                get: function (): HTMLElement[] {
                    // tslint:disable-next-line no-this-assignment no-invalid-this
                    const self: HTMLElement = <HTMLElement>this;

                    if (self.shadowRoot) {
                        return Array.from(self.shadowRoot.querySelectorAll(selector));
                    }

                    return Array.from(self.querySelectorAll(selector));
                },
                set: (): void => {
                    throw new Error('Do not try to set the value of a decorated "@ChildElements" property');
                },
            },
        );
    };
}
