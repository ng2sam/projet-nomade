import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-blog-list',
  templateUrl: 'blog-list.html'
})
export class BlogListPage {
  @Input() articles;
  @Input() type;
  @Input() selectedArticle;


  @Output() onSelect = new EventEmitter();
  
  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello BlogListPage Page');
  }

}
