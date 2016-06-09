import {Inject, OnDestroy} from '@angular/core'
import {Alert, Page, NavController, Modal, NavParams, Loading} from 'ionic-angular';

import {VerbalService} from '../../../providers/verbal-service/tcs/verbal-service';

import {TCSVerbalInstruction} from '../tcs-instructions/tcs-instructions';
import {TCSVerbalResult} from '../tcs-exam-result/tcs-exam-result';

@Page({
    templateUrl: 'build/pages/verbal/tcs-exam/tcs-exam.html',
})
export class TCSVerbalExam implements OnDestroy {
    public test: any
    public loading: any
    public id: any
    private interval: any;
    private done: boolean;
    constructor(
        public verbalService: VerbalService,
        public nav: NavController,
        public navParams: NavParams
    ) {
        this.test = navParams.get('test');
        this.id = this.test.id
        // this.startLoading();
        // this.loadTest();
        this.startTest();
    }

    startTest() {
        this.startTime();
    };
    startTime() {
        this.interval = setInterval(() => {
            this.test.time.seconds -= 1;
            if (this.test.time.seconds > 0) {
                this.test.time.minute = parseInt((this.test.time.seconds / 60) + '');
                this.test.time.second = this.test.time.seconds % 60;
            } else {
                this.endTime();
            }
            this.setCount();
        }, 1000);


    };
    endTime() {
        clearInterval(this.interval)
        this.evaluateAnswer();
    };
    evaluateAnswer() {
        // let alert = Alert.create({
        //     title: 'Time\'s up!',
        //     subTitle: 'Test ended!',
        //     buttons: ['OK']
        // });
        // this.nav.present(alert);
        this.nav.push(TCSVerbalResult, {
            test: this.test
        });
    };
    endTest(ev) {
        let confirm = Alert.create({
            title: 'Are you sure you want to end the test?',
            message: 'Click on Yes to check your performance.',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.endTime();
                    }
                }
            ]
        });
        this.nav.present(confirm);
    };
    setCount() {
        this.test.word = this.wordCount(this.test.answer);
    };
    wordCount(content) {
        if (content.length == 0)
            return content.length;
        var seperatePlusText = content.replace(/\s/g, '+');
        var m = seperatePlusText.replace(/^\s/g, '+');
        var str1 = m.replace(/\+*$/gi, '');
        var str2 = str1.replace(/\++/g, ' ');
        return str2.split(' ').length;
    };
    loadTest() {
        this.verbalService.test(this.id)
            .then(test => {
                this.test = test;
                this.stopLoading();
                this.startTest();
            })
    }

    instructions() {
        this.done = false;
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
                if (this.test) {
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
    ngOnDestroy() {
        clearInterval(this.interval);
    }
    onPageDidEnter() {
        if (this.done) {
            setTimeout(() => {
                this.nav.pop();
            }, 0);
        }
        this.done = true;
    }
}