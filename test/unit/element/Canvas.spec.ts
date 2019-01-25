import {Canvas} from '../../../src/element/Canvas';

// tslint:disable mocha-no-side-effect-code

describe('Canvas', (): void => {
    let root: HTMLDivElement;
    let canvas: Canvas;

    beforeEach((): void => {
        root = document.createElement('div');
        canvas = new Canvas({
            width: 400,
            height: 350
        });
    });

    describe('get context', (): void => {
        it('return the 2d context object', (): void => {
            expect(Object.prototype.toString.call(canvas.context)).toEqual('[object CanvasRenderingContext2D]');
        });
    });

    describe('get classList', (): void => {
        it('return the classList object of the element', (): void => {
            expect(Object.prototype.toString.call(canvas.classList)).toEqual('[object DOMTokenList]');
        });
    });

    describe('get size', (): void => {
        it('return the classList object of the element', (): void => {
            expect(Object.prototype.toString.call(canvas.classList)).toEqual('[object DOMTokenList]');
        });
    });

    describe('get style', (): void => {
        it('return the style object of the element', (): void => {
            expect(Object.prototype.toString.call(canvas.style)).toEqual('[object CSSStyleDeclaration]');
        });
    });

    describe('set size', (): void => {
        it('adjust the dimensions of the canvas element', (): void => {
            canvas.appendTo(root);
            canvas.size = { width: 100, height: 500 };

            const el: HTMLCanvasElement = root.querySelector('canvas');

            expect(canvas.size).toEqual({ width: 100, height: 500 });
            expect(el.getAttribute('width')).toEqual('100px');
            expect(el.getAttribute('height')).toEqual('500px');
        });
    });

    describe('appendTo', (): void => {
        it('add the canvas element as a child element of the given element', (): void => {
            expect(root.querySelector('canvas')).toEqual(null);

            canvas.appendTo(root);

            expect(root.querySelector('canvas')).not.toEqual(null);
        });
    });

    describe('clear', (): void => {
        it('clears the canvas', (): void => {
            expect(canvas.clear()).toBe(canvas);
        });
    });
});
