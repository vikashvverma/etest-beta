import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/contact/contact.html'
})
export class Contact {
  private urls:Object;
  constructor() {
    this.urls = {
      facebook: "https://www.facebook.com/vikashvverma",
      googleplus: "https://www.google.com/+VikashVerma",
      linkedin: "https://in.linkedin.com/in/vikashvverma",
      twitter: "https://twitter.com/_vikashverma",
    }
  }
  open(social) {
    window.open(this.urls[social]);
  }
}