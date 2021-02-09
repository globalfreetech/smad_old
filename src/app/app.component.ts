import { Component, OnInit } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  showMenu: boolean;
  userdetails;
  custid: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseAuthentication: FirebaseAuthentication,
    private menuCtrl: MenuController,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          console.log('this.router.url', this.router.url);
          if (this.router.url !== '/registration'){
            this.showMenu = true;
          }else{
            this.showMenu = false;
          }
        }
      }
    );
    this.userdetails = localStorage.getItem('userdetails');
    console.log(this.userdetails);
    this.custid = this.userdetails.custid;
    console.log(this.custid);
  }
  navigatetoenqpage(): void {
    this.router.navigate(['/enquiry'], {state: {bookingId: 0, businessId: 0}});
  }
  logout(){
    this.firebaseAuthentication.signOut();
    localStorage.removeItem('mobileno');
    this.router.navigateByUrl('/registration');
  }
}
