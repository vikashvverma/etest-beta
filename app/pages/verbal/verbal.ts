import {ViewChild} from '@angular/core';
import {Page, NavController} from 'ionic-angular';
import {SocialSharing} from 'ionic-native';
import {TCSVerbal} from './tcs/tcs-verbal';

@Page({
    templateUrl: 'build/pages/verbal/verbal.html'
})
export class Verbal {
    private nav: NavController;
    tests: Array<{ title: string, logo: string, content: string, id: string }>

    constructor(nav: NavController) {
        this.nav=nav;
        this.tests = [
            {
                title: "TCS Verbal Ability Test",
                logo: "img/tcs-logo.png",
                content: "TCS Verbal Ability Test requires you to write an email based on given outline and synopsis",
                id: "tcs"
            }
        ];
    }
    share(logo) {
        SocialSharing.share("Download etest app from Play Store and take TCS Verbal Ability Test", "TCS Verbal Ability Test", logo, "https://play.google.com");
    }
    verbal(id) {
        this.nav.push(TCSVerbal);
    }
}