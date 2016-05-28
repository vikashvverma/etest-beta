import {Page} from 'ionic-angular';
import {SocialSharing} from 'ionic-native';

@Page({
    templateUrl: 'build/pages/aptitude/aptitude.html'
})
export class Aptitude {
    tests: Array<{ title: string, logo: string, content: string }>

    constructor() {
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
}