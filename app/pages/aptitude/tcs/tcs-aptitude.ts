import {Page, NavController, Loading} from 'ionic-angular';
import {AptitudeService} from '../../../providers/aptitude-service/aptitude.service';

@Page({
    templateUrl: 'build/pages/aptitude/tcs/tcs-aptitude.html',
    providers: [AptitudeService]
})
export class TCSAptitude {
    public tests: any
    private loading:any
    constructor(public aptitudeService: AptitudeService, public nav: NavController) {
        this.startLoading();
        this.fetchTests();
    }
    fetchTests() {
        this.aptitudeService.load()
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