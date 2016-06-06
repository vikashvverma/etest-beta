import {Modal, NavController, Page, ViewController} from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/verbal/tcs-instructions/tcs-instructions.html'
})
export class TCSVerbalInstruction {
    private nav: NavController;
    tests: Array<{ title: string, logo: string, content: string, id: string }>

    constructor(private viewCtrl: ViewController) {
    }
    close() {
    this.viewCtrl.dismiss();
  }
}