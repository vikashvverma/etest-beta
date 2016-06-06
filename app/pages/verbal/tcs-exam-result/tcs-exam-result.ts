import {Page, Modal, NavController, NavParams} from 'ionic-angular';

import {VerbalService} from '../../../providers/verbal-service/tcs/verbal-service';

import {TCSVerbalLeaderboard} from '../tcs-leaderboard/tcs-leaderboard'

@Page({
    templateUrl: 'build/pages/verbal/tcs-exam-result/tcs-exam-result.html',
})
export class TCSVerbalResult {
    public test: any;
    public result: any;
    constructor(
        public nav: NavController,
        public navParams: NavParams,
        public verbalService: VerbalService
    ) {
        this.test = navParams.get('test');
        this.evaluate();
    }

    evaluate() {
        this.result = this.verbalService.evaluate(this.test);
    }
    previous() {
        let active = this.nav.getActive();
        let previous = this.nav.getPrevious(active);
        this.nav.popTo(this.nav.getPrevious(previous));
    }

    leaderboard() {
        let board = Modal.create(TCSVerbalLeaderboard, { id: this.test.id });
        this.nav.present(board);
    }
}