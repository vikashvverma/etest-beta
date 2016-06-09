import {Page, Modal, NavController, NavParams} from 'ionic-angular';

import {AuthService} from '../../../providers/auth-service/auth';
import {VerbalService} from '../../../providers/verbal-service/tcs/verbal-service';

import {TCSVerbalLeaderboard} from '../tcs-leaderboard/tcs-leaderboard'
import {EtestChart} from '../../../components/chart/chart'

import {Util} from '../../../util/util'

declare var $: any;

@Page({
    templateUrl: 'build/pages/verbal/tcs-exam-result/tcs-exam-result.html',
    directives: [EtestChart]
})
export class TCSVerbalResult {
    public test: any;
    public result: any;
    public resultData: any;
    public seriesData: any;
    public rankData: any;
    private auth: any;
    constructor(
        private nav: NavController,
        private navParams: NavParams,
        private verbalService: VerbalService,
        private util: Util,
        auth: AuthService
    ) {
        this.test = navParams.get('test');
        this.auth = auth;
        this.evaluate();
        this.getGraphData();
    }

    evaluate() {
        this.result = this.verbalService.evaluate(this.test);
        setTimeout(() => {
            this.result.spellcheck()
                .then(data => {
                    console.log(data);
                    this.hideNameErrors();
                },
                err => {
                    console.log(err);
                },
                ready => {
                    console.log(ready);
                })
        }, 1000)
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
    getGraphData() {
        this.verbalService.getStatistics(this.test.id, this.auth.user.user_id)
            .then(data => {
                this.resultData = this.util.chartOptions('Performance in Set' + this.test.id, 'spline', data, undefined);
            });
        this.verbalService.getAllStatistics(this.auth.user.user_id)
            .then(data => {
                this.seriesData = this.util.chartOptions('Performance in Set' + this.test.id, 'spline', data, undefined);
            });
        this.verbalService.getRankStatistics(this.test.id, this.auth.user.user_id)
            .then(data => {
                this.rankData = this.util.chartOptions('Performance in Set' + this.test.id, 'spline', data, undefined);
            })
    }
    hideNameErrors() {
        var _this=this;
        $('.tcs-verbal-exam-result .hiddenSpellError').map((i,el) => {
            console.log($(el).html()=="Vikash");
            if (_this.test.names.length && ($(el).html() == _this.test.names[0] || $(el).html() == _this.test.names[1])) {
                console.log($(el).toggleClass('hiddenSpellError'));
            }
        });
    }
}