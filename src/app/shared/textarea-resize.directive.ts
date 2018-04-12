import { Directive, ElementRef, Renderer2, HostListener, AfterViewChecked } from '@angular/core';

@Directive({
    selector: '[appTextareaResize]'
})

export class TextareaResizeDirective{
    constructor(private elRef: ElementRef, private renderer: Renderer2) { }


    @HostListener('input') toggleOpen(eventData: Event){
        console.log(this.elRef.nativeElement.scrollHeight);
        this.renderer.setStyle(this.elRef.nativeElement, 'height', this.elRef.nativeElement.scrollHeight + 'px');
        this.renderer.setStyle(this.elRef.nativeElement, 'overflow-y', 'hidden');
        this.renderer.setStyle(this.elRef.nativeElement, 'height', 'auto');
        this.renderer.setStyle(this.elRef.nativeElement, 'height', this.elRef.nativeElement.scrollHeight + 'px');
    }

}