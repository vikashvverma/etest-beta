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
    private _id: any;
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
        this.util.isOnline();
    }

    evaluate() {
        this.result = this.verbalService.evaluate(this.test);
        this.result.userId = this.auth.user.user_id
        this.result.name = this.auth.user.name.indexOf('@') > 0 ? this.auth.user.nickname : this.auth.user.name;
        this.updateTest(this.test.id, this.result);
        if (this.result.score) {
            if (this.util.isOnline()) {
                this.checkSpelling();
            } else {
                this.util.presentToast(this.nav, "It seems you are not online, check your internet connection!", 1000);
            }
        }
    }
    updateTest(id, result) {
        this.verbalService.updateTest(id, result)
            .then(data => {
                this._id = data['_id'];
                this.getGraphData();
            },
            err => {
                console.log(err);
                this.getGraphData();
            })
    }
    checkSpelling() {
        setTimeout(() => {
            this.result.spellcheck()
                .then(data => {
                    console.log(data);
                    this.hideNameErrors();
                    let mistakes = this.countMistakes();
                    if (mistakes > 0) {
                        this.result.score -= 10;
                    } else {
                        this.result.score += 10;
                    }

                    if (this._id) {
                        this.verbalService.patchTest(this.test.id, this._id, this.result)
                            .then(data => {
                                // this.util.presentToast(this.nav, "Your score has been adjusted after checking spelling or grammatical error(s)!", 0);
                                this.getGraphData();
                            })
                    }
                },
                err => {
                    console.log(err);
                    this.util.presentToast(this.nav, "Couldn't check spelling and grammar mistake(s)!", 1000);
                },
                ready => {
                    console.log(ready);
                    this.util.presentToast(this.nav, "Checking Spelling and Grammar!", 1000);
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
                this.seriesData = this.util.chartOptions('Performance in all set', 'spline', data, undefined);
            });
        this.verbalService.getRankStatistics(this.test.id, this.auth.user.user_id)
            .then(data => {
                this.rankData = this.util.chartOptions('Rank in Set ' + this.test.id, 'spline', data, undefined);
            })
    }
    hideNameErrors() {
        var _this = this;
        $('.tcs-verbal-exam-result .hiddenSpellError').map((i, el) => {
            console.log($(el).html() == "Vikash");
            if (_this.test.names.length && ($(el).html() == _this.test.names[0] || $(el).html() == _this.test.names[1])) {
                console.log($(el).toggleClass('hiddenSpellError'));
            }
        });
    }

    countMistakes() {
        let mistakes = $('.tcs-verbal-exam-result .hiddenSpellError').length;
        this.util.presentToast(this.nav, "You have made " + mistakes + " mistakes!", 0);
        return mistakes;
    }
}