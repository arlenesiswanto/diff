import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.css']
})
export class DatasetsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openQueryModal() {
    document.getElementById("modal-query").style.display = "block";
  }

  closeQueryModal() {
    document.getElementById("modal-query").style.display = "none";
  }

}
