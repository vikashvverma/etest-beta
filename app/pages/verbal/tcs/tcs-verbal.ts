import {Inject} from '@angular/core'
import {Page, NavController, Loading} from 'ionic-angular';
import {VerbalService} from '../../../providers/verbal-service/verbal-service';

@Page({
    templateUrl: 'build/pages/verbal/tcs/tcs-verbal.html',
    providers: [VerbalService]
})
export class TCSVerbal {
    public tests: any
    private loading:any
    constructor(public verbalService: VerbalService, public nav: NavController) {
        this.startLoading();
        this.fetchTests();
    }
    fetchTests() {
        this.verbalService.load()
            .then(data => {
                this.tests = data;
                this.stopLoading();
            })
    }
    startLoading() {
        this.loading = Loading.create({
            spinner: 'ios',
            content: 'Please wait...'
        });

        this.nav.present(this.loading);
    }
    stopLoading() {
        this.loading.dismiss();
    }
}