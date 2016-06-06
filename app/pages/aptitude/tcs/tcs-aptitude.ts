import {Page, NavController, Loading} from 'ionic-angular';
import {AptitudeService} from '../../../providers/aptitude-service/tcs/aptitude.service';

@Page({
    templateUrl: 'build/pages/aptitude/tcs/tcs-aptitude.html'
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

        this.nav.present(this.loading)
        .then(data=>{
           if(this.tests){
               this.stopLoading();
           } 
        });
    }
    stopLoading() {
        try {
            this.loading.dismiss();
        } catch (e) {

        }
    }
}