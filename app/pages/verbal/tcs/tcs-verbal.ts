import {Inject} from '@angular/core'
import {Page, NavController, Modal, Loading} from 'ionic-angular';
import {AuthService} from '../../../providers/auth-service/auth';

import {VerbalService} from '../../../providers/verbal-service/tcs/verbal-service';

import {Util} from '../../../util/util';

import {TCSVerbalExam} from '../tcs-exam/tcs-exam'
import {TCSVerbalInstruction} from '../tcs-instructions/tcs-instructions';

@Page({
    templateUrl: 'build/pages/verbal/tcs/tcs-verbal.html'
})
export class TCSVerbal {
    public tests: any
    public loading: any
    constructor(
        private auth: AuthService,
        public verbalService: VerbalService,
        public nav: NavController,
        private util: Util
    ) {
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
        if (this.auth.authenticated()) {
            this.startLoading();
            this.verbalService.test(id)
                .then(test => {
                    this.stopLoading();
                    this.nav.push(TCSVerbalExam, {
                        test: test
                    });
                },
                err => {
                    this.stopLoading();
                    this.util.presentToast(this.nav, err, 2000);
                })

        } else {
            this.util.presentToast(this.nav,'You are not logged in. Login to take the tetst!',2000);
            this.auth.login();
        }
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