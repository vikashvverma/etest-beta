import {Page, NavController} from 'ionic-angular';
import {Http, Headers} from '@angular/http';

import {Util} from '../../util/util'

@Page({
  templateUrl: 'build/pages/contact/contact.html'
})
export class Contact {
  private urls: Object;
  constructor(private util: Util, private nav: NavController, private http: Http) {
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
  send(name, email, subject, message) {
    if (!name) {
      return this.util.presentToast(this.nav, "😟 Please enter your name!", 1000);
    }

    if (!this.validateEmail(email)) {
      return this.util.presentToast(this.nav, "😛 Invalid email id!", 1000);
    }

    if (!subject) {
      return this.util.presentToast(this.nav, "😧 Please enter subject!", 1000);
    }

    if (!message) {
      return this.util.presentToast(this.nav, "Oho 😃 you forgot the message!", 1000);
    }
    let payload = {
      name,
      email,
      subject,
      message,
    }
    let headers: Headers = new Headers();
    headers.set("Content-Type", "application/json");
    // Here we use authHttp to make an authenticated
    // request to the server. Change the endpoint up for
    // one that points to your own server.
    this.http.post('http://etest.programminggeek.in/api/mailer/mail', JSON.stringify(payload), { headers })
      .map(res => res.json())
      .subscribe(
      data => {
        if (data.success) {
          this.util.presentToast(this.nav, "😎, Your message has been sent, you will get reply as soon as possible!!!", 2000);
        } else {
          this.util.presentToast(this.nav, "😟, Your message could not be sent!", 2000);
        }
      },
      err => {
        this.util.presentToast(this.nav, "😟, Your message could not be sent!", 2000);
      });

  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}