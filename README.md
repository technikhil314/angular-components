# angular-2-daterangepicker

Currently you will have to include jquery.js,bootstrap.css,moment.js in order to make this work

This module is strictly intended to work on browsers only and not in node/browserless environments

This is still a work in progress and I am on my way to remove dependancy on bootstrap.css and jquery.js though moment will remain as dependancy always.

	<!-- Include Required Prerequisites -->
	<script type="text/javascript" src="//cdn.jsdelivr.net/jquery/1/jquery.min.js"></script>
	<script type="text/javascript" src="//cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
	<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap/3/css/bootstrap.css" />

	<!-- Include Date Range Picker -->
	<script type="text/javascript" src="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.js"></script>
	<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />

Use this as: 
<pre>
	&lt;date-range-picker [fromDate]="'04/01/2017'" [toDate]="'04/02/2017'" [format]="'DD/MM/YYYY'" (datesSelected)="demo($event)"&gt; &lt;/date-range-picker&gt;
</pre>

currently only three options are made available

1. format
	Use this to configure date format which you want. If not provided it defaults to YYYY-MM-DD
2. fromDate and
3. toDate
	Both dates are supposed to be string and are accepted in format provided.
	If not provided then both dates defaults to current date in provided format
	
To get selected dates subscribe to datesSelected event
which passes a javascript object in following format
{
	fromDate: contains a moement object, format it as per your needs,
	toDate: contains a moement object, format it as per your needs
}