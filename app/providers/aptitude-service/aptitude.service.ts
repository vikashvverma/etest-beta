import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the VerbalService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AptitudeService {
  http:Http
  data:Array<any>;
  baseUrl = 'http://etest.programminggeek.in/api/aptitude/tcs';
  constructor(http:Http) {
    this.http = http;
    this.data = null;
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
          this.data=data;
          // data.map( tests=>{
            // this.data=this.data.concat(tests.tests);
          // });
          this.data=this.data.map(test=>{
            test.attempted_on=test.attempted_on && new Date(test.attempted_on);
            test.last_attempt_on=test.last_attempt_on && new Date(test.last_attempt_on);
            test.last_attempt_by=test.last_attempt_by && test.last_attempt_by.split("@")[0];
            test.highest_scorer=test.highest_scorer && test.highest_scorer.split("@")[0];
            return test;
          });
          resolve(this.data);
        });
    });
  }
}

