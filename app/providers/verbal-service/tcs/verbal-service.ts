import {Storage, LocalStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {Http, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

import {Util} from '../../../util/util'

/*
  Generated class for the VerbalService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class VerbalService {
  http: Http
  data: Array<any>;
  baseUrl = 'http://etest.programminggeek.in/api/verbal/tcs';
  // baseUrl = 'http://localhost:3000/api/verbal/tcs';
  local: Storage = new Storage(LocalStorage);
  instruction: Array<any> = [
    {
      icon: 'fa fa-hand-o-right',
      instruction: 'It is compulsory to use all the specific words mentioned in the Outline in your email. You can add other sentences of your choice, as appropriate'
    }, {
      icon: 'fa fa-hand-o-right',
      instruction: 'The name of the sender and receiver should be as given.'
    }, {
      icon: 'fa fa-hand-o-right',
      instruction: 'The email must contain a minimum of fifty words, or it will not be evaluated at all.'
    }, {
      icon: 'fa fa-hand-o-right',
      instruction: 'If the outline is not strictly followed (including the speific words used), or correct English (including spelling and grammar) is not used, the grade in this section will be poor.'
    }
  ];
  constructor(http: Http, private util: Util) {
    this.http = http;
    this.data = null;
  }

  initFromCache() {
    this.local.get('tcsverbals').then(tests => {
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
      let headers: Headers = new Headers();
      headers.set("Content-Type", "application/json");
      this.http.get(this.baseUrl, { headers })
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.local.set("tcsverbals", JSON.stringify(data));
          this.data = this.transform(data);
          resolve(this.data);
        });
    });
  }
  test(id) {
    return new Promise((resolve, reject) => {
      this.lookupLocally('tcsverbaltests')
        .then(test => {
          if (test && JSON.parse(test) && JSON.parse(test)[id]) {
            resolve(JSON.parse(JSON.parse(test)[id]));
          } else {
            let headers: Headers = new Headers();
            headers.set("Content-Type", "application/json");
            this.http.get(this.baseUrl + "/" + id, { headers })
              .map(res => res.json())
              .subscribe(data => {

                data.time = {
                  minute: 10,
                  second: 0,
                  seconds: 600
                };
                data.word = 0;
                data.answer = '';

                this.local.get("tcsverbaltests")
                  .then(tests => {
                    let updatedTests
                    if (tests && JSON.parse(tests)) {
                      updatedTests = JSON.parse(tests);
                    }
                    updatedTests = updatedTests || {};
                    updatedTests[id] = JSON.stringify(data);
                    this.local.set("tcsverbaltests", JSON.stringify(updatedTests));
                  })
                resolve(data);
              },
              err => {
                reject({ error: "could not fetch data!" })
              });
          }
        })
    });

  }
  getRankStatistics(id, userId) {
    let isOnline = this.util.isOnline;
    return new Promise((resolve, reject) => {
      if (isOnline) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('userId', userId);
        let headers: Headers = new Headers();
        headers.set("Content-Type", "application/json");
        this.http.get(this.baseUrl + '/stat/rank/' + id, { search: params, headers: headers })
          .map(data => data.json())
          .subscribe(data => {
            this.local.set("tcs_verbal_rank_statistics", JSON.stringify(data))
            resolve(data);
          },
          err => {
            this.lookupLocally("tcs_verbal_rank_statistics")
              .then(data => {
                if (data && JSON.parse(data)) {
                  resolve(JSON.parse(data))
                } else {
                  reject({ error: "Offline, could not connect to server!" })
                }
              },
              err => {
                reject({ error: "could not fetch data!" })
              })
          })
      }
    });
  }
  getAllStatistics(userId) {
    let isOnline = this.util.isOnline;
    return new Promise((resolve, reject) => {
      if (isOnline) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('userId', userId);
        let headers: Headers = new Headers();
        headers.set("Content-Type", "application/json");
        this.http.get(this.baseUrl + '/stat/all', { search: params, headers: headers })
          .map(data => data.json())
          .subscribe(data => {
            this.local.set("tcs_verbal_all_statistics", JSON.stringify(data))
            resolve(data);
          },
          err => {
            this.lookupLocally("tcs_verbal_all_statistics")
              .then(data => {
                if (data && JSON.parse(data)) {
                  resolve(JSON.parse(data))
                } else {
                  reject({ error: "Offline, could not connect to server!" })
                }
              })
          })
      }
    });
  }
  getStatistics(id, userId) {
    let isOnline = this.util.isOnline;
    return new Promise((resolve, reject) => {
      if (isOnline) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('userId', userId);
        let headers: Headers = new Headers();
        headers.set("Content-Type", "application/json");
        this.http.get(this.baseUrl + '/stat/' + id, { search: params, headers: headers })
          .map(data => data.json())
          .subscribe(data => {
            this.local.get("tcs_verbal_test_statistics")
              .then(stats => {
                let updatedTests
                if (stats && JSON.parse(stats)) {
                  updatedTests = JSON.parse(stats);
                }
                updatedTests = updatedTests || {};
                updatedTests[id] = JSON.stringify(data);
                this.local.set("tcs_verbal_test_statistics", JSON.stringify(updatedTests));
              })
            resolve(data);
          },
          err => {
            this.lookupLocally("tcs_verbal_test_statistics")
              .then(data => {
                if (data && JSON.parse(data) && JSON.parse(data)[id]) {
                  resolve(JSON.parse(JSON.parse(data)[id]));
                } else {
                  reject({ error: "Offline, could not connect to server!" })
                }
              })
          })
      }

    });
  }
  getLeaderBoard(id) {
    let isOnline = this.util.isOnline;
    return new Promise((resolve, reject) => {
      if (isOnline) {
        let headers: Headers = new Headers();
        headers.set("Content-Type", "application/json");
        this.http.get(this.baseUrl + '/leaderboard/' + id, { headers })
          .map(data => data.json())
          .subscribe(data => {
            this.local.get("tcs_verbal_leaderboard")
              .then(stats => {
                let leaderboard
                if (stats && JSON.parse(stats)) {
                  leaderboard = JSON.parse(stats);
                }
                leaderboard = leaderboard || {};
                leaderboard[id] = JSON.stringify(data);
                this.local.set("tcs_verbal_leaderboard", JSON.stringify(leaderboard));
              })
            resolve(data);
          },
          err => {
            this.lookupLocally("tcs_verbal_leaderboard")
              .then(data => {
                if (data && JSON.parse(data) && JSON.parse(data)[id]) {
                  resolve(JSON.parse(JSON.parse(data)[id]));
                } else {
                  reject({ error: "Offline, could not connect to server!" })
                }
              })
          })
      }

    });
  }
  updateTest(id, testData) {
    return new Promise((resolve, reject) => {
      let headers: Headers = new Headers();
      headers.set("Content-Type", "application/json");
      this.http.put(this.baseUrl + '/' + id, JSON.stringify(testData), { headers })
        .map(data => data.json())
        .subscribe(data => {
          resolve(data);
        },
        err => {
          reject({ error: "could not update your test, check your internet connection!" })
        })
    });
  }
  patchTest(testId, _id, testData) {
    return new Promise((resolve, reject) => {
      let headers: Headers = new Headers();
      headers.set("Content-Type", "application/json");
      this.http.patch(this.baseUrl + '/' + testId + '/' + _id, JSON.stringify(testData), { headers })
        .map(data => data.json())
        .subscribe(data => {
          resolve(data);
        },
        err => {
          reject({ error: "could not update your test, check your internet connection!" })
        })
    });
  }
  evaluate(test) {
    return this.util.evaluate(test.word, test.outline, test.answer);
  }
  instructions() {
    return this.instruction;
  }
  lookupLocally(storage) {
    return this.local.get(storage);
  }
  transform(data) {
    var tests = [];
    data.map(t => {
      tests = tests.concat(t.tests);
    });
    return tests.map(test => {
      test.date = moment(test.date).format('ll');
      test.last_attempt_on = moment(test.last_attempt_on).format('ll');
      test.last_attempt_by = test.last_attempt_by && test.last_attempt_by.split("@")[0];
      test.highest_scorer = test.highest_scorer && test.highest_scorer.split("@")[0];
      return test;
    });
  }
}

