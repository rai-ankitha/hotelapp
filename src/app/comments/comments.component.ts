
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {pluck } from 'rxjs';
import { CommentService } from './comment.service';


@Component({
  selector: 'hinv-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit{          

  comments$=this.commentService.getComments();
  comment1$=this.activatedRoute.data.pipe(pluck("comment"));
constructor(private commentService:CommentService,private activatedRoute:ActivatedRoute){
}
  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data)=>{console.log(data['comment']);});
  }

}
