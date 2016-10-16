import { Component } from '@angular/core';
import {Platform, NavController, NavParams } from 'ionic-angular';
import {News} from '../../providers/news/news';
declare var AdMob: any;

@Component({
    templateUrl: 'build/pages/news/news.html',
    providers: [News]
})
export class NewsPage {
    newsData: any = {};
    page: number = 1;
    data: any = {};
    title: any;
    website: any;
    private admobId: any;

    constructor(private platform: Platform, private navCtrl: NavController, private navParams: NavParams, private news: News) {
        this.title = this.navParams.get('websiteKh') ? this.navParams.get('websiteKh') : 'ពត៌មានជាតិ';
        this.website = this.navParams.get('website') ? this.navParams.get('website') : '';
        this.news.get(this.website).then((data) => {
            this.newsData = data;
        });
        this.platform.ready().then(() => {
            let trackingPage = this.navParams.get('website') ? this.navParams.get('website') : 'Home';
            (<any>window).analytics.trackView(trackingPage);

            //AdMob
            if(/(android)/i.test(navigator.userAgent)) {
                this.admobId = {
                    banner: 'ca-app-pub-2691898388649437/1921536905',
                    interstitial: 'ca-app-pub-2691898388649437/4875003301'
                };
            } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
                this.admobId = {
                    banner: 'ca-app-pub-2691898388649437/1921536905',
                    interstitial: 'ca-app-pub-2691898388649437/4875003301'
                };
            }

            if(AdMob) {
                console.log('AdMob Created');
                AdMob.createBanner({
                    adId: this.admobId.banner,
                    autoShow: true,
                    position: AdMob.AD_POSITION.BOTTOM_CENTER
                });
            }

        });
    }


    doInfinite(infiniteScroll) {
        this.page ++;
        this.news.get(this.website, this.page).then((data) => {
            this.data = data;
            for (var i = 0; i < this.data.length; i ++){
                this.newsData.push(this.data[i]);
            }
            infiniteScroll.complete();
        });
    }

    doRefresh(refresher) {
        this.news.get(this.website).then((data) => {
            this.data = data;
            if (this.data.length){
                this.page = 1;
                this.newsData = this.data;
            }
            refresher.complete();
        });
    }

    goDetail(url){
        open(url, "_blank", "location=no");
    }

}
