import {Storage, LocalStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';


/*
  Generated class for the VerbalService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {
    http: Http
    pictures: Array<any>;
    baseUrl = 'http://etest.programminggeek.in/api/aptitude/tcs';
    auth0Url = 'https://programminggeek.auth0.com/api/v2/users/';
    local: Storage = new Storage(LocalStorage);
    constructor(http: Http) {
        this.http = http;
        this.pictures = null;
    }

    picture(id) {
        return new Promise(resolve => {
            this.lookupLocally("pictures")
                .then(data => {
                    if (data && JSON.parse(data) && JSON.parse(data)[id]) {
                        resolve(JSON.parse(JSON.parse(data)[id]));
                    } else {
                        let headers = new Headers();
                        this.createAuthorizationHeader(headers);
                        let params: URLSearchParams = new URLSearchParams();
                        params.set('fields', 'picture');
                        params.set('include_fields', 'true');
                        this.http.get(this.auth0Url + id, { search: params, headers: headers })
                            .map(data => data.json())
                            .subscribe(data => {
                                this.local.get("pictures")
                                    .then(stats => {
                                        let pictures
                                        if (stats && JSON.parse(stats)) {
                                            pictures = JSON.parse(stats);
                                        }
                                        pictures = pictures || {};
                                        pictures[id] = JSON.stringify(data);
                                        this.local.set("pictures", JSON.stringify(pictures));
                                    })
                                resolve(data);
                            })
                    }
                })
        });
    }
    lookupLocally(storage) {
        return this.local.get(storage);
    }
    createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJGRnlDajFpbHhyU0ROS2hJU1B0UDUxaU1XVDJ5REluNiIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInJlYWQiXX19LCJpYXQiOjE0NjA4MjY1NTQsImp0aSI6ImVmZjYyZjExYjdlZjQ3YjYyMTk3ZWUyOTJiMzQyMDY0In0.ljmBWkOekRlYYFMhV4KPBR9zlOhcKmsNh7yulkmFApg'
        );
    }
}

