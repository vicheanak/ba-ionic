import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, Nav, LoadingController, AlertController} from 'ionic-angular';
import {StatusBar, Push, Splashscreen} from 'ionic-native';
import {provideCloud, CloudSettings} from '@ionic/cloud-angular';
import {Deploy} from '@ionic/cloud-angular';
import { NewsPage } from './pages/news/news';
import {PushNotification} from './providers/push-notification/push-notification';



const cloudSettings: CloudSettings = {
    'core': {
        'app_id': 'd81351b8'
    }
};

@Component({
    templateUrl: 'build/app.html',
    providers: [PushNotification]
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

    constructor(private platform: Platform, private pushNotification: PushNotification, public alertCtrl: AlertController, private deploy: Deploy, public loadingCtrl: LoadingController) {
        this.pages = [
        {name: '', title: 'ពត៌មានជាតិ', component: NewsPage },
        { name: 'kohsantepheap', title: 'កោះសន្តិភាព', component: NewsPage },
        { name: 'rfa', title: 'អាសុីសេរី', component: NewsPage },
        { name: 'voa', title: 'វីអូអេ', component: NewsPage },
        { name: 'thmeythmey', title: 'ថ្មីថ្មី', component: NewsPage },
        { name: 'phnompenhpost', title: 'ភ្នំពេញ ប៉ុស្តិ', component: NewsPage },
        { name: 'dapnews', title: 'ដើមអម្ពិល', component: NewsPage },
        { name: 'kampucheathmey', title: 'កម្ពុជាថ្មី', component: NewsPage },
        { name: 'freshnews', title: 'Fresh News', component: NewsPage },
        { name: 'cen', title: 'CEN', component: NewsPage },
        { name: 'vod', title: 'VOD', component: NewsPage },
        { name: 'camnews', title: 'CamNews', component: NewsPage },
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
            Splashscreen.hide();



            //Push Notification
            let push = Push.init({
                android: {
                    senderID: "460703149408"
                },
                ios: {
                    alert: "true",
                    badge: true,
                    sound: 'false'
                },
                windows: {}
            });
            push.on('registration', (data) => {
                this.pushNotification.insert(data.registrationId).then(() => {
                    console.log(data.registrationId);
                });
            });
            push.on('notification', (data) => {
                let self = this;
                if (data.additionalData.foreground) {
                    let confirmAlert = this.alertCtrl.create({
                        title: "New update is available",
                        message: data.message,
                        buttons: [{
                            text: 'បិទ',
                            role: 'cancel'
                        }, {
                            text: 'យល់ព្រម',
                            handler: () => {
                                // self.nav.setRoot(NewsPage);
                                this.updateApp();
                            }
                        }]
                    });
                    confirmAlert.present();
                } else {
                    // self.nav.setRoot(NewsPage);
                    self.updateApp();
                }
            });
            push.on('error', (e) => {
                console.log(e.message);
            });
            (<any>window).analytics.startTrackerWithId("UA-85758513-1");
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
        this.deploy.check().then((snapshotAvailable) => {
            this.snapshotAvailable = snapshotAvailable;
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
        });
    }
}

ionicBootstrap(MyApp, [
    Deploy,
    provideCloud(cloudSettings)
    ], {
        backButtonText: '',
    });
