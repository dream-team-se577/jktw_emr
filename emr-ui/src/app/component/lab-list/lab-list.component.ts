import { Component, Input,  Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Lab } from "../../model/lab";
import { LabService } from '../../service/lab.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-lab-list',
  templateUrl: './lab-list.component.html',
  styleUrls: ['./lab-list.component.css']
})
export class LabListComponent implements OnInit, OnChanges {
  labList: Lab[] = [];

  @Input() labs: number[] = [];

  constructor(private labService: LabService) { }

  ngOnInit() {
    if (!this.labs)
    {
      return;
    }

    this.labs.forEach(l => {
      this.labService.getLab(l).subscribe(
        data => {
          let newLab = new Lab();
          newLab.fromJson(data);

          if (this.labList.some(l => l.id === newLab.id))
          {
            return true;
          }

          this.labList.push(newLab);
          return true;
        },
        error => {
          return Observable.throw(error);
        }
      )
    });
  }

  ngOnChanges() {
    this.ngOnInit();
  }
}
