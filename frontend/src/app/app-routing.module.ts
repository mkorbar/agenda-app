import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BucketListComponent } from './bucket-list/bucket-list.component';

const routes: Routes = [
  { path: 'buckets', component: BucketListComponent },
  { path: '**', redirectTo: 'buckets' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
