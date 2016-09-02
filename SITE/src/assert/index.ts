import { it,  inject } from '@angular/core/testing';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { Type } from '@angular/compiler/src/facade/lang';

/* Assert helper
 * Abstracts angular unit test boilerplate code
*/ 
 
/* istanbul ignore next */
export class Assert<TComponent> {
    constructor(private type : Type, private overrideProviders : any[] = []) {
    }

    public it(name : string, fn : (component : TComponent, element : any, fixture : ComponentFixture<TComponent>) => void) {            
        return it(name, inject( [TestComponentBuilder], (testComponentBuilder : TestComponentBuilder) => {
            return testComponentBuilder
                .overrideProviders(this.type, this.overrideProviders)
                .createAsync(this.type).then(fixture => {
                    fn(fixture.debugElement.componentInstance, fixture.debugElement.nativeElement, fixture);                            
                });
        }));
    }

    public itAsync(name : string, fn : (done : any, component : TComponent, element : any, fixture : ComponentFixture<TComponent>) => void) {            
        let doneCallback = null;
        let injectFn = inject([TestComponentBuilder], (testComponentBuilder : TestComponentBuilder) => {
            return testComponentBuilder
                .overrideProviders(this.type, this.overrideProviders)
                .createAsync(this.type).then(fixture => {
                    fn(doneCallback, fixture.debugElement.componentInstance, fixture.debugElement.nativeElement, fixture);                            
                });
        });

        return it(name, (done) => {
            injectFn();
            doneCallback = done;
        });
    }
}