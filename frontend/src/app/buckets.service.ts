import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

import { Bucket } from './bucket.model';
import { Object } from './object.model';
import { Location } from './location.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BucketsService {

  baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getBuckets() {
    return this.http
      .get<{ buckets: any[] }>
      (this.baseUrl + '/buckets')
      .pipe(map(data => {
        return {
          buckets: data.buckets.map(bucket => {
            return {
              id: bucket._id,
              name: bucket.name,
              location: bucket.location
            }
          })
        }
      }));
  }

  getBucket(id: string): Observable<Bucket> {
    return this.http.get<{ bucket: any }>(this.baseUrl + '/buckets/' + id)
      .pipe(map(data => {
        return {
          id: data.bucket._id,
          name: data.bucket.name,
          location: data.bucket.location
        }
      }));
  }

  postBucket(bucketName: string, bucketLocation: Location) {
    return this.http.post<{ bucket: { _id: string, name: string, location: Location } }>(
      this.baseUrl + '/buckets/',
      {
        bucketName: bucketName,
        bucketLocation: bucketLocation
      }
    );
  }

  getObjects(bucketId: string) {
    return this.http.get<{ objects: Object[] }>(this.baseUrl + '/buckets/' + bucketId + '/objects');
  }

  postObject(bucketId: string, uploadFile: File) {
    const objectData = new FormData();
    objectData.append('uploadFile', uploadFile);
    return this.http.post<{ message: string, object: any }>(
      this.baseUrl + '/buckets/' + bucketId + '/objects',
      objectData
    );
  }

  getLocations() {
    return this.http.get<{ locations: Location[] }>(this.baseUrl + '/locations/');
  }
}
