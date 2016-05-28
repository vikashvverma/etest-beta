import {Page} from 'ionic-angular';
import {SocialSharing} from 'ionic-native';

@Page({
    templateUrl: 'build/pages/verbal/verbal.html'
})
export class Verbal {
    tests: Array<{ title: string, logo: string, content: string }>

    constructor() {
        this.tests = [
            {
                title: "TCS Verbal Ability Test",
                logo: "img/tcs-logo.png",
                content: "TCS Verbal Ability Test requires you to write an email based on given outline and synopsis",
            }
        ];
    }
    share(logo) {
        SocialSharing.share("Download etest app from Play Store and take TCS Verbal Ability Test", "TCS Verbal Ability Test", logo, "https://play.google.com");
    }
}