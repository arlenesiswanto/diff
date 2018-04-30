import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.css']
})
export class DatasetsComponent implements OnInit {

  operations = ["sum", "average", "max", "min"];
  currentDataset = {
    "title": "Apricot Prescription Holders",
    "date": "217832",
    "author": "Massachusetts General Hospital",
    "description": "Here is a short simple description about what the database about acetominophen prescription holders does",
    "columns": ["age", "height", "weight", "quantity ordered"],
    "num_entries": 329,
    "num_queries": 21
  };
  allDatasets = [
    {
      "title": "Apricot Prescription Holders",
      "date": "217832",
      "author": "Massachusetts General Hospital",
      "description": "Here is a short simple description about what the database about acetominophen prescription holders does",
      "columns": ["age", "height", "weight", "quantity ordered"],
      "num_entries": 329,
      "num_queries": 21
    },
    {
      "title": "Boysenberry Prescription Holders",
      "date": "483950",
      "author": "Massachusetts Institute of Technology",
      "description": "Here is a short simple description about what the database about acetominophen prescription holders does",
      "columns": ["age", "height", "weight", "quantity ordered"],
      "num_entries": 32,
      "num_queries": 833
    },
    {
      "title": "Cranberry Prescription Holders",
      "date": "9302",
      "author": "Massachusetts Institute of Technology",
      "description": "Here is a short simple description about what the database about acetominophen prescription holders does",
      "columns": ["age", "height", "weight", "quantity ordered"],
      "num_entries": 382,
      "num_queries": 93
    },
    {
      "title": "Dragonfruit Prescription Holders",
      "date": "82882",
      "author": "Massachusetts Institute of Technology",
      "description": "Here is a short simple description about what the database about acetominophen prescription holders does",
      "columns": ["age", "height", "weight", "quantity ordered"],
      "num_entries": 939,
      "num_queries": 83
    },
    {
      "title": "Elderberry Prescription Holders",
      "date": "9944",
      "author": "Massachusetts Institute of Technology",
      "description": "Here is a short simple description about what the database about acetominophen prescription holders does",
      "columns": ["age", "height", "weight", "quantity ordered"],
      "num_entries": 4949,
      "num_queries": 343
    },
    {
      "title": "Fig Prescription Holders",
      "date": "5445",
      "author": "Massachusetts Institute of Technology",
      "description": "Here is a short simple description about what the database about acetominophen prescription holders does",
      "columns": ["age", "height", "weight", "quantity ordered"],
      "num_entries": 5454,
      "num_queries": 7630
    },
    {
      "title": "Grapefruit Prescription Holders",
      "date": "90343",
      "author": "Massachusetts Institute of Technology",
      "description": "Here is a short simple description about what the database about acetominophen prescription holders does",
      "columns": ["age", "height", "weight", "quantity ordered"],
      "num_entries": 405,
      "num_queries": 26
    },
    {
      "title": "Honeyberry Prescription Holders",
      "date": "3294",
      "author": "Massachusetts Institute of Technology",
      "description": "Here is a short simple description about what the database about acetominophen prescription holders does",
      "columns": ["age", "height", "weight", "quantity ordered"],
      "num_entries": 293,
      "num_queries": 10
    },
    {
      "title": "Jackfruit Prescription Holders",
      "date": "944",
      "author": "Massachusetts Institute of Technology",
      "description": "Here is a short simple description about what the database about acetominophen prescription holders does",
      "columns": ["age", "height", "weight", "quantity ordered"],
      "num_entries": 283,
      "num_queries": 384
    },
    {
      "title": "Kiwi Prescription Holders",
      "date": "439233",
      "author": "Massachusetts Institute of Technology",
      "description": "Here is a short simple description about what the database about acetominophen prescription holders does",
      "columns": ["age", "height", "weight", "quantity ordered"],
      "num_entries": 32,
      "num_queries": 399
    }
  ];
  sortedDatasets = [];
  sortedBy = "date-desc";

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.sortedDatasets = this.allDatasets.slice(0);
    this.http.get('https://api.github.com/users/seeschweiler')
        .subscribe(data => {
              // this.allDatasets.push(data);
              console.log(data);
              // console.log(this.allDatasets);
        });
    this.sortByDate();
  }

  sortByDate() {
    if (this.sortedBy == "date-asc") {
      this.sortedDatasets.sort((a, b) => parseInt(a.date) < parseInt(b.date) ? -1 : parseInt(a.date) > parseInt(b.date) ? 1 : 0);
      this.sortedBy = "date-desc";
    } else {
      this.sortedDatasets.sort((a, b) => parseInt(a.date) > parseInt(b.date) ? -1 : parseInt(a.date) < parseInt(b.date) ? 1 : 0);
      this.sortedBy = "date-asc";
    }
  }

  sortByTitle() {
    if (this.sortedBy == "title-desc") {
      this.sortedDatasets.sort((a, b) => a.title > b.title ? -1 : a.title < b.title ? 1 : 0);
      this.sortedBy = "title-asc";
    } else {
      this.sortedDatasets.sort((a, b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0);
      this.sortedBy = "title-desc";
    }
  }

  sortByQuery() {
    if (this.sortedBy == "query-asc") {
      this.sortedDatasets.sort((a, b) => a.num_queries < b.num_queries ? -1 : a.num_queries > b.num_queries ? 1 : 0);
      this.sortedBy = "query-desc";
    } else {
      this.sortedDatasets.sort((a, b) => a.num_queries > b.num_queries ? -1 : a.num_queries < b.num_queries ? 1 : 0);
      this.sortedBy = "query-asc";
    }
  }

  openQueryModal() {
    document.getElementById("modal-query").style.display = "block";
  }

  closeQueryModal() {
    document.getElementById("modal-query").style.display = "none";
  }

}
