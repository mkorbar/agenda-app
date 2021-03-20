import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BucketListComponent } from './bucket-list/bucket-list.component';
import { BucketDetailComponent } from './bucket-detail/bucket-detail.component';
import { NgxFilesizeModule } from 'ngx-filesize';

@NgModule({
  declarations: [
    AppComponent,
    BucketListComponent,
    BucketDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxFilesizeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
