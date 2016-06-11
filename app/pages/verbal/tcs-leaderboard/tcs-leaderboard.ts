import {Modal, NavController, NavParams, Page, ViewController, Loading} from 'ionic-angular';

import {VerbalService} from '../../../providers/verbal-service/tcs/verbal-service';
import {UserService} from '../../../providers/user-service/user.service';

@Page({
    templateUrl: 'build/pages/verbal/tcs-leaderboard/tcs-leaderboard.html'
})
export class TCSVerbalLeaderboard {
    public leaderboard: any;
    public id: any;
    private loading: any;
    constructor(
        private viewCtrl: ViewController,
        private verbalService: VerbalService,
        private navParams: NavParams,
        private nav: NavController,
        private userService: UserService
    ) {
        this.id = navParams.get('id');
        this.startLoading();
        this.getLeaderboard();
    }
    getLeaderboard() {
        this.verbalService.getLeaderBoard(this.id)
            .then(leaderboard => {
                this.leaderboard = leaderboard;
                this.fetchPictures();
                this.stopLoading();
            },
            err => {
                this.stopLoading();
            })
    }
    fetchPictures() {
        this.leaderboard.map(user => {
            this.userService.picture(user.userId)
                .then(data => {
                    user.picture = data;
                })
        })
    }
    close() {
        this.viewCtrl.dismiss();
    }
    startLoading() {
        this.loading = Loading.create({
            spinner: 'ios',
            content: 'Please wait...'
        });

        this.nav.present(this.loading)
            .then(data => {
                if (this.leaderboard) {
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