import { Directive, ElementRef, Renderer2, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective{
    @HostListener('click') toggleOpen(eventData: Event){
     this.isOpen = !this.isOpen;
    }
    
    @HostBinding('class.open') isOpen = false

}