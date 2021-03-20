import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Bucket } from './bucket.model';

@Injectable({
  providedIn: 'root'
})
export class BucketsService {

  baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getBuckets() {
    return this.http.get<{ buckets: Bucket[] }>(this.baseUrl + '/buckets');
  }
}