import { Component } from '@angular/core';
import { CHART_DIRECTIVES } from 'angular2-highcharts';

@Component({
    selector: 'etest-chart',
    directives: [CHART_DIRECTIVES],
    inputs: ['options'],
    template: `
        <chart [options]="options" style="width:90%;"></chart>
    `
})
export class EtestChart {
    options: any;
    constructor() {
    }

    ngAfterViewInit() {
        let el=document.querySelector(".highcharts-container");
        console.log(el);
    }
}