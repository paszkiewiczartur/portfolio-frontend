import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagComponent } from './tag/tag.component';
import { TagsStartComponent } from './tags-start/tags-start.component';
import { TagsComponent } from './tags.component';

const tagsRoutes: Routes = [
  { path: 'tags', component: TagsComponent, children: [
    { path: '', component: TagsStartComponent, pathMatch: 'full' },
    { path: ':tagPath', component: TagComponent }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(tagsRoutes)],
  exports: [RouterModule]
})
export class TagsRoutingModule {}
