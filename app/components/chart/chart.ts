import { Component, AfterViewInit } from '@angular/core';
import { CHART_DIRECTIVES } from 'angular2-highcharts';

declare var $:any;

@Component({
    selector: 'etest-chart',
    directives: [CHART_DIRECTIVES],
    inputs: ['options'],
    template: `
        <chart [options]="options" style="width:90%;"></chart>
    `
})
export class EtestChart implements AfterViewInit {
    options: any;
    constructor() {
    }

    ngAfterViewInit() {
        $('etest-chart').find('.highcharts-container  text').last().css('display','none')
    }
}