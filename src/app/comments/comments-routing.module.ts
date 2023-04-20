import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsComponent } from './comments.component';
import { CommentGuard } from './guard/comment.guard';

const routes: Routes = [{ path: '', component: CommentsComponent ,resolve:{Comment:CommentGuard}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule { }
