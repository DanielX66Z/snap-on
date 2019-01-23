import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { InicioPage } from '../pages/inicio/inicio';
import { CategoryProvider } from '../providers/category/category';
import { LoginPage } from '../pages/login/login';
import { CartPage } from '../pages/cart/cart';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = InicioPage;

  pages: Array<{title: string, component: any}>;
  categories: any[];

  constructor(public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen, private categoryService: CategoryProvider, private events:Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Principal', component: HomePage },
      { title: 'Mi carro', component: CartPage },
      { title: 'Mi Cuenta', component: LoginPage}

    ];
    this.getCategories();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);

  }

  goToCategory(category){
    this.nav.push('CategoryPage',{category:category})
 }

 getCategories(){
   this.categoryService.getCategories();

   this.events.subscribe('categoryLoaded', () => {
     this.categories = this.categoryService.categories;
     
   })
 }
}
