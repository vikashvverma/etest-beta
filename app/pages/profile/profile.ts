// app/pages/profile/profile.ts

import {Page} from 'ionic-angular';
import {AuthService} from '../../providers/auth-service/auth';

@Page({
  templateUrl: 'build/pages/profile/profile.html',
})
export class Profile {
  
  // We need to inject AuthService so that we can
  // use it in the view
  constructor(private auth: AuthService) {
    
  }
}