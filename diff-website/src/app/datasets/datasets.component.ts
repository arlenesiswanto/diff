import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AllDatasets } from './allDatasets.type';

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.css']
})
export class DatasetsComponent implements OnInit {

  settings = ["1 - low accuracy, high privacy",
              "2 - lower accuracy, higher privacy",
              "3 - medium accuracy, medium privacy",
              "4 - higher accuracy, lower privacy",
              "5 - high accuracy, low privacy"];
  operations = ["sum", "avg", "min", "max"];
  currentFilter = "";
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
  currentColumn = "";
  currentOperation = "";
  currentFrom = "";
  currentTo = "";
  currentValue = "--";
  newTitle = "";
  newAuthor = "";
  newDescription ="";
  newSetting = "";
  newFile:any = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Array<AllDatasets>>('http://eb-attempt2.pxs3rfwnk3.us-east-2.elasticbeanstalk.com/tables/')
        .subscribe(data => {
              console.log(data);
              this.allDatasets = data;
              if (this.allDatasets.length > 0) {
                this.currentDataset = this.allDatasets[0];
              }
              console.log(this.allDatasets);
              console.log(this.currentDataset);
              this.sortedDatasets = this.allDatasets.slice(0);
              console.log(this.sortedDatasets);
              console.log(this.allDatasets);
          },
          err => {
            console.log("Could not get datasets");
          }
        );
    this.sortByDate();
  }

  // fileChange(event) {
  //     let fileList: FileList = event.target.files;
  //     if(fileList.length > 0) {
  //         let file: File = fileList[0];
  //         let formData:FormData = new FormData();
  //         console.log(file.name);
  //         console.log(file);
  //         formData.append('file', file, file.name);
  //         let data = new HttpParams();
  //         data = data.set("tname", "uploadedtable");
  //         data = data.set("author", "Arlene");
  //         data = data.set("description", "firstfileuploaded");
  //         let myheader = new HttpHeaders().set('enctype', 'multipart/form-data');
  //         console.log(data.toString());
  //         this.http.post("http://eb-cors.pxs3rfwnk3.us-east-2.elasticbeanstalk.com/table/upload/", formData, { params: data })
  //             .subscribe(res => {
  //               console.log("successful");
  //             }, error => {
  //               console.log(error);
  //             });
  //     }
  // }

  clearValue() {
    this.currentValue = "--";
  }

  uploadFile(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        this.newFile = file;
        console.log(this.newFile);
    }
  }

  createDataset() {
    let formData:FormData = new FormData();
    console.log(this.newFile);
    formData.append('file', this.newFile, this.newFile.name);
    let data = new HttpParams();
    data = data.set("tname", this.newTitle);
    data = data.set("author", this.newAuthor);
    data = data.set("description", this.newDescription);
    let myheader = new HttpHeaders().set('enctype', 'multipart/form-data');
    this.http.post("http://eb-attempt2.pxs3rfwnk3.us-east-2.elasticbeanstalk.com/table/upload/", formData, { params: data })
        .subscribe(res => {
          console.log("successful");
        }, error => {
          console.log(error);
        });
  }

  submitCreate() {
    console.log(this.newTitle);
    console.log(this.newAuthor);
    console.log(this.newDescription);
    console.log(this.newSetting);
    console.log(this.newFile);
    var validParams = true;
    for (let i of [this.newTitle, this.newAuthor, this.newDescription, this.newSetting]) {
      if (i.length == 0) {
        console.log("invalid empty value");
        validParams = false;
      }
    }
    if (this.newFile == null) {
      console.log("no file uploaded");
      validParams = false;
    }
    if (validParams) {
      console.log("valid request!");
      this.createDataset();
    } else {
      console.log("error processing request");
    }
  }

  submitQuery() {
    var validQuery = true;
    for (let i of [this.currentColumn, this.currentOperation, this.currentFrom, this.currentTo]) {
      if (i.length == 0) {
        console.log("invalid empty value");
        validQuery = false;
      }
    }
    var from = Math.floor(Number(this.currentFrom));
    if (from === Infinity || String(from) !== this.currentFrom || from <= 0 || from > this.currentDataset['num_entries']) {
      console.log("'from' value out of bounds");
      validQuery = false;
    }
    var to = Math.floor(Number(this.currentTo));
    if (to === Infinity || String(to) !== this.currentTo || to <= 0 || to > this.currentDataset['num_entries']) {
      console.log("'to' value out of bounds");
      validQuery = false;
    }
    if (from > to) {
      console.log("invalid range");
      validQuery = false;
    }
    if (validQuery) {
      console.log("valid query!");
      this.sendQuery();
    } else {
      this.currentValue = "--";
      console.log("error processing query");
    }
  }

  sendQuery() {
    this.http.get<string>('http://eb-flask.pxs3rfwnk3.us-east-2.elasticbeanstalk.com/table/column/', {
      params: {
        tname: this.currentDataset["title"],
        cname: this.currentColumn,
        start: this.currentFrom,
        end: this.currentTo,
        op: this.currentOperation
      },
      observe: 'response'
    })
      .subscribe(
        res => {
          console.log(res);
          this.currentValue = res.body;
          console.log(this.currentValue);
        },
        err => {
          console.log("Error occured");
        }
      )
  }

  selectDataset(set) {
    this.currentDataset = set;
    this.currentColumn = "";
    this.currentOperation = "";
    this.currentFrom = "";
    this.currentTo = "";
    this.currentValue = "--";
  }

  onFilterChange(searchValue:string) {
    console.log(searchValue);
    var newDatasets = [];
    for (let dataset of this.allDatasets) {
      if (dataset.title.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0) {
        newDatasets.push(dataset);
      }
    }
    this.sortedDatasets = newDatasets.slice(0);
  }

  sortByDate() {
    if (this.sortedBy == "date-asc") {
      this.sortedDatasets.sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0);
      this.sortedBy = "date-desc";
    } else {
      this.sortedDatasets.sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0);
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

  openCreateModal() {
    document.getElementById("modal-create").style.display = "block";
  }

  closeCreateModal() {
    document.getElementById("modal-create").style.display = "none";
  }
}
