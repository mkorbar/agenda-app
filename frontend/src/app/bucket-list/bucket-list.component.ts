import { Component, OnInit } from '@angular/core';
import { Bucket } from '../bucket.model';
import { BucketsService } from '../buckets.service';

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css']
})
export class BucketListComponent implements OnInit {

  buckets: Bucket[] = [];
  loading = true;
  error = '';

  constructor(private bucketsService: BucketsService) { }

  ngOnInit(): void {
    this.bucketsService.getBuckets().subscribe((res) => {
      this.buckets = res.buckets;
      this.loading = false;
      this.error = '';
    }, () => {
      this.error = 'Error loading buckets';
    })
  }

}
