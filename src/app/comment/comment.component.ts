import { Component, OnInit } from '@angular/core';
import { CommentService } from './comment.service';

@Component({
  selector: 'hinv-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  
  comments$ = this.commentService.getComments();

  constructor(private commentService : CommentService) { }


  ngOnInit(): void {
  }

}
