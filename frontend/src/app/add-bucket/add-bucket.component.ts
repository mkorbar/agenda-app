import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Bucket } from '../bucket.model';
import { Location } from '../location.model';
import { BucketsService } from '../buckets.service';

@Component({
  selector: 'app-add-bucket',
  templateUrl: './add-bucket.component.html',
  styleUrls: ['./add-bucket.component.css']
})
export class AddBucketComponent implements OnInit {

  @Output() bucketCreated = new EventEmitter<Bucket>();

  // TODO: get locations from API
  locations: Location[] = [];
  bucketName = '';
  bucketLocation: Location = null;

  constructor(private bucketService: BucketsService) { }

  ngOnInit(): void {
    this.bucketService.getLocations().subscribe(data => {
      this.locations = data.locations;
    });
  }

  onCreateBucket(): void {
    const location = this.bucketLocation;
    const name = this.bucketName;

    this.bucketService.postBucket(this.bucketName, this.bucketLocation)
      .subscribe(
        data => {
          this.bucketCreated.emit(data.bucket);
        }
      );
  }
}
