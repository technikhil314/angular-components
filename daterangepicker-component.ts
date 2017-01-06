import { 
	Component, 
	ElementRef,
	OnInit,
	Input,
	Output,
	EventEmitter 	} 
from '@angular/core';

declare var $:any;
declare var moment: any;
declare var daterangepicker: any;

@Component({
	selector: 'date-range-picker',
	template: `
		<input type="text"/>
	`
})
export class DaterangepickerComponent implements OnInit{
	@Input() fromDate: string;
	@Input() toDate: string;
	@Input() format: string;
	@Output() datesSelected = new EventEmitter();
	constructor(private elem: ElementRef){
	}
	ngOnInit(){
		let that: DaterangepickerComponent = this;
		$(this.elem.nativeElement)
		.daterangepicker({
		    locale: {
			  format: this.format || 'YYYY-MM-DD'
			},
			startDate: this.fromDate || new Date(),
			endDate: this.toDate || new Date()
		}, 
		function(start, end, label) {
			that.datesSelected.emit({
				fromDate: start,
				toDate: end
			});
		});
	}
}