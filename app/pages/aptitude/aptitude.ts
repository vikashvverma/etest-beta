import {Page, NavController} from 'ionic-angular';
import {SocialSharing} from 'ionic-native';
import {TCSAptitude} from './tcs/tcs-aptitude';

@Page({
    templateUrl: 'build/pages/aptitude/aptitude.html'
})
export class Aptitude {
    private nav: NavController;
    tests: Array<{ title: string, logo: string, content: string }>

    constructor(nav: NavController) {
        this.nav = nav;
        this.tests = [
            {
                title: "TCS Analytical Ability Test",
                logo: "img/tcs-logo.png",
                content: "TCS Analytical Ability Test requires you to write an email based on given outline and synopsis",
            }
        ];
    }
    share(logo) {
        SocialSharing.share("Download etest app from Play Store and take TCS Analytical Ability Test", "TCS Analytical Ability Test", logo, "https://play.google.com");
    }
    aptitude(id) {
        this.nav.push(TCSAptitude);
    }
}