import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from '../shared/bookmark.model';

@Component({
  selector: 'app-bookmark-title',
  templateUrl: './bookmark-title.component.html',
  styleUrls: ['./bookmark-title.component.scss']
})
export class BookmarkTitleComponent implements OnInit {

  @Input() bookmark: Bookmark | any

  titleIconSrc: string | any

  favIconError: boolean | any

  constructor() { }

  ngOnInit(): void {
    this.titleIconSrc = this.bookmark.url.origin + '/favicon.ico'
  }

}
