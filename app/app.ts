import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, Nav, LoadingController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {provideCloud, CloudSettings} from '@ionic/cloud-angular';
import {Deploy} from '@ionic/cloud-angular';
import { NewsPage } from './pages/news/news';


const cloudSettings: CloudSettings = {
    'core': {
        'app_id': 'd81351b8'
    }
};

@Component({
    templateUrl: 'build/app.html'
})
export class MyApp {
    pages: any;
    @ViewChild(Nav) nav: Nav;
    rootPage: any = NewsPage;
    snapshotAvailable: boolean = false;
    updateStatus: any;
    loading: boolean;
    updateColor: any = 'green';
    updateText: any = "You're Up to Date";

    constructor(private platform: Platform, private deploy: Deploy, public loadingCtrl: LoadingController) {
        this.pages = [
        {name: '', title: 'ពត៌មានជាតិ', component: NewsPage },
        { name: 'kohsantepheap', title: 'កោះសន្តិភាព', component: NewsPage },
        { name: 'rfa', title: 'អាសុីសេរី', component: NewsPage },
        { name: 'voa', title: 'វីអូអេ', component: NewsPage },
        { name: 'thmeythmey', title: 'ថ្មីថ្មី', component: NewsPage },
        { name: 'freshnews', title: 'Fresh News', component: NewsPage },
        { name: 'dapnews', title: 'ដើមអម្ពិល', component: NewsPage },
        ];

        this.deploy.check().then((snapshotAvailable) => {
            this.snapshotAvailable = snapshotAvailable;
            if (this.snapshotAvailable){
                this.updateText = 'New Update is Available!';
                this.updateColor = 'red';
            }
            else{
                this.updateText = "You're Up to Date!";
                this.updateColor = 'green';
            }
        });

        platform.ready().then(() => {
            StatusBar.styleDefault();
            (<any>window).analytics.startTrackerWithId("UA-85523544-1");
        });
    }

    openPage(page) {
        // (<any>window).trackEvent("Website", "Get", "Website", 25);
        this.nav.setRoot(page.component, {
            website: page.name,
            websiteKh: page.title
        });
    }

    updateApp(){
        // (<any>window).trackEvent("Update", "Post", "Update", 25);
        if (this.snapshotAvailable){
            let loader = this.loadingCtrl.create({
                content: "កំពុងទាញយកទិន្ន័យ..."
            });
            loader.present();
            this.deploy.download().then(() => {
                this.deploy.extract().then(() => {
                    return this.deploy.load();
                });
            });
        }
    }
}

ionicBootstrap(MyApp, [
    Deploy,
    provideCloud(cloudSettings)
    ], {
        backButtonText: '',
    });
