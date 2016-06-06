import {Storage, LocalStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';


/*
  Generated class for the VerbalService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AptitudeService {
  http: Http
  data: Array<any>;
  baseUrl = 'http://etest.programminggeek.in/api/aptitude/tcs';
  local: Storage = new Storage(LocalStorage);
  constructor(http: Http) {
    this.http = http;
    this.data = null;
  }

  initFromCache() {
    this.local.get('tcsaptitudes').then(tests => {
      this.data = JSON.parse(tests);
      this.data = this.data && this.transform(this.data);
    }).catch(error => {
      console.log(error);
    });
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get(this.baseUrl)
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.local.set('tcsaptitudes', JSON.stringify(data));
          this.data = this.transform(data)
          resolve(this.data);
        });
    });
  }
  transform(data) {
    return data.map(test => {
      test.attempted_on = test.attempted_on && moment(test.attempted_on).format('ll');
      test.last_attempt_on = test.last_attempt_on && moment(test.last_attempt_on).format('ll');
      test.last_attempt_by = test.last_attempt_by && test.last_attempt_by.split("@")[0];
      test.highest_scorer = test.highest_scorer && test.highest_scorer.split("@")[0];
      return test;
    });
  }
}

