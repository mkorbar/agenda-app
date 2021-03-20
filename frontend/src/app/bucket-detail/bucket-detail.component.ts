import { Component, OnInit } from '@angular/core';

import { BucketsService } from '../buckets.service';
import { Bucket } from '../bucket.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bucket-detail',
  templateUrl: './bucket-detail.component.html',
  styleUrls: ['./bucket-detail.component.css']
})
export class BucketDetailComponent implements OnInit {
  bucket: Bucket;
  loading = true;
  cardShowing = 'files';
  files = [];
  bucketStorage = 0;
  error = '';

  constructor(private bucketsService: BucketsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.bucketsService.getBucket(id).subscribe((res) => {
      this.bucket = res.bucket;
      this.loading = false;
      this.error = '';
    }, () => {
      this.error = 'Error while fetching bucket'
    })
  }

}
