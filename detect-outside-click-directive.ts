import { ElementRef, Directive, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
	selector: '[detect-outside-click]'
})
export class DetectOutsideClick {
	constructor(private elem: ElementRef){
	}
	
	@Output() outsideClick = new EventEmitter();
	
	@HostListener('document:click', ['$event'])
	@HostListener('document:mousedown', ['$event'])
	@HostListener('document:mouseup', ['$event'])
	handleOutsideClick(event) {
		var current = event.target;
		var host = this.elem.nativeElement;
		do {
			if ( current === host ) {
				this.outsideClick.emit(true);
				return;
			}
			current = current.parentNode;
		} while ( current );
		this.outsideClick.emit(false);
	}
}
