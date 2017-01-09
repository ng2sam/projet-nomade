import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/rx';
import { BlogDetailPage } from './blog-detail/blog-detail';
import { AuthService, BlogServices } from '../../../shared/providers'

@Component({
  selector: 'page-blog',
  templateUrl: 'blog.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPage {
  menu: string = "tous";
  blogs: Observable<any[]>;
  envArticle: Observable<any[]>;
  asileArticle: Observable<any[]>;
  selectedArticle: any;
  constructor(public navCtrl: NavController, private auth: AuthService, private _blog: BlogServices) {
    this.blogs = this._blog.getArticles();
    this.asileArticle = this._blog.getAsileArticles();
    this.envArticle = this._blog.getEnvArticles();
  }

  ionViewDidLoad() {
    console.log('Hello blog Page');
  }

  select($event) {
    $event.article.type = $event.type;
    console.log($event);
    this.selectedArticle = $event.article;
    this.gotoDetail(this.selectedArticle);
  }

  gotoDetail(article: any) {
    this.navCtrl.push(BlogDetailPage, { param: article });
  }

}
