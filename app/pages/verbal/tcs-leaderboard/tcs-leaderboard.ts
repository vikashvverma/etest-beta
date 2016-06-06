import {Modal, NavController, NavParams, Page, ViewController} from 'ionic-angular';

import {VerbalService} from '../../../providers/verbal-service/tcs/verbal-service';
import {UserService} from '../../../providers/user-service/user.service';

@Page({
    templateUrl: 'build/pages/verbal/tcs-leaderboard/tcs-leaderboard.html'
})
export class TCSVerbalLeaderboard {
    private nav: NavController;
    public leaderboard: any;
    public id: any;
    constructor(
        private viewCtrl: ViewController,
        private verbalService: VerbalService,
        private navParams: NavParams,
        private userService: UserService
    ) {
        this.id = navParams.get('id');
        this.getLeaderboard();
    }
    getLeaderboard() {
        this.verbalService.getLeaderBoard(this.id)
            .then(leaderboard => {
                this.leaderboard = leaderboard;
                this.fetchPictures();
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
}