import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BucketListComponent } from './bucket-list/bucket-list.component';
import { BucketDetailComponent } from './bucket-detail/bucket-detail.component';
import { NgxFilesizeModule } from 'ngx-filesize';
import { AddBucketComponent } from './add-bucket/add-bucket.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BucketListComponent,
    BucketDetailComponent,
    AddBucketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxFilesizeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
