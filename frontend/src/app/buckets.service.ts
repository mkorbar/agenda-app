import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Bucket } from './bucket.model';
import { Object } from './object.model';

@Injectable({
  providedIn: 'root'
})
export class BucketsService {

  baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getBuckets() {
    return this.http.get<{ buckets: Bucket[] }>(this.baseUrl + '/buckets');
  }

  getBucket(id: string) {
    return this.http.get<{ bucket: Bucket }>(this.baseUrl + '/buckets/' + id);
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
}
