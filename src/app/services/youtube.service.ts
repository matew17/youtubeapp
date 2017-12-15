import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyDr4fsFs0o7Tz98V2UD9-sSR2jmD3B2YRc';
  private playlist = 'UUGRjJrpD2bmk9Ilq6nq80qg';
  private nextPageToken: string;

  constructor(private http: Http) { }

  getVideos() {
    const url = `${this.youtubeUrl}/playlistItems`;

    const params = new URLSearchParams();
    params.set('part', 'snippet');
    params.set('maxResults', '10');
    params.set('playlistId', this.playlist);
    params.set('key', this.apiKey);
    if (this.nextPageToken) {
      params.set('pageToken', this.nextPageToken);
    }


    return this.http.get(url, { search: params })
      .map(res => {
        console.log(res.json());
        this.nextPageToken = res.json().nextPageToken;
        let videos: any[] = [];
        for (let video of res.json().items) {
          let snippet = video.snippet;
          videos.push(snippet)
        }
        return videos;
      });
  }

}
