import {Inject} from '@angular/core'
import {Page, NavController, Modal, Loading, Toast} from 'ionic-angular';
import {AuthService} from '../../../providers/auth-service/auth';

import {VerbalService} from '../../../providers/verbal-service/tcs/verbal-service';

import {TCSVerbalExam} from '../tcs-exam/tcs-exam'
import {TCSVerbalInstruction} from '../tcs-instructions/tcs-instructions';

@Page({
    templateUrl: 'build/pages/verbal/tcs/tcs-verbal.html'
})
export class TCSVerbal {
    public tests: any
    public loading: any
    constructor(private auth: AuthService, public verbalService: VerbalService, public nav: NavController) {
        this.startLoading();
        this.fetchTests();
    }
    fetchTests() {
        let _this = this;
        this.verbalService.load()
            .then(data => {
                _this.tests = data;
                _this.stopLoading();
            })
    }
    start(event, id) {
        // if (this.auth.authenticated()) {
        this.nav.push(TCSVerbalExam, {
            id: id
        });
        // } else {
        // let toast = Toast.create({
        //     message: 'You are not logged in. Login to take the tetst!',
        //     duration: 2000
        // });
        // this.auth.login();
        // }
    }
    instructions() {
        let instruction = Modal.create(TCSVerbalInstruction);
        this.nav.present(instruction);
    }
    startLoading() {
        this.loading = Loading.create({
            spinner: 'ios',
            content: 'Please wait...'
        });

        this.nav.present(this.loading)
            .then(data => {
                if (this.tests) {
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