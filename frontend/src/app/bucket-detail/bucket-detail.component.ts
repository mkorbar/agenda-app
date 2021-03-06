import { Component, OnInit } from '@angular/core';

import { BucketsService } from '../buckets.service';
import { Bucket } from '../bucket.model';
import { Object } from '../object.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bucket-detail',
  templateUrl: './bucket-detail.component.html',
  styleUrls: ['./bucket-detail.component.css']
})
export class BucketDetailComponent implements OnInit {
  bucket: Bucket;
  title = '';
  loading = true;
  cardShowing = 'files';
  files: Object[] = [];
  bucketStorage = 0;
  error = '';

  constructor(
    private bucketsService: BucketsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;

    this.bucketsService.getObjects(id).subscribe((res) => {
      this.files = res.objects
      this.bucketStorage = res.objects.map(obj => obj.size).reduce((a, b) => a + b);
    }, () => {
      console.log('Error while fetching objects from the bucket');
    })

    this.bucketsService.getBucket(id).subscribe((res) => {
      this.bucket = res;
      this.title = res.name;
    }, () => {
      console.log('Error while fetching bucket');
    })
  }

  onFileInput($event) {
    this.bucketsService.postObject(this.bucket.id, $event.target.files[0])
      .subscribe(data => {
        this.files.push(data.object);
        this.bucketStorage = this.files.map(obj => obj.size).reduce((a, b) => a + b);
      });
  }

  onBucketDelete() {
    this.bucketsService.deleteBucket(this.bucket.id).subscribe(() => {
      this.router.navigate(['/']);
    })
  }

  onFileDelete() {
    alert("I don't know which file to deltete");
  }

}
