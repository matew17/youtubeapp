import { YoutubeService } from './../../services/youtube.service';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  videos: any[] = [];
  videoSel: any;

  constructor(private yS: YoutubeService) {
    this.yS.getVideos().subscribe(videos => {
      this.videos = videos;
    });
  }

  ngOnInit() { }

  verVideo(video: any) {
    this.videoSel = video;
    $('#youTubeModal').modal();
  }

  cerrarModal() {
    this.videoSel = null;
    $('#youTubeModal').modal('hide');
  }

  cargarMasVideos() {
    this.yS.getVideos().subscribe(videos => {
      this.videos.push(...videos);
    });
  }
}
