import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HronologyService } from '../../services/hronology.service';

@Component({
  selector: 'app-hronology',
  templateUrl: './hronology.component.html',
  styleUrls: ['./hronology.component.scss']
})
export class HronologyComponent implements OnInit {
  info = new FormGroup({
    idOrder: new FormControl('', [Validators.required])
  });

  dateAcceptionOrder :any;
  dateCreationOrder: any;
  production = "";
  isDone = "";

  showProgressBar = false;

  procentProgressBar = 25;

  orderNotFound = false;

  constructor(private _orderHronologyService: HronologyService) { }

  ngOnInit(): void {
  }

  get idOrderControl() {
    return this.info.get('idOrder');
  }

  checkInfo() {
    if (this.info.invalid) { this.info.markAllAsTouched(); return; }
    this.procentProgressBar = 25;
    this._orderHronologyService.getOrderHronology(this.idOrderControl?.value)
      .subscribe( r=> {
        if (r[0] == undefined) this.orderNotFound = true;
        else {
          this.orderNotFound = false;
          this.dateCreationOrder = r[0]['dateCreationOrder'].split('T')[0];
          this.dateAcceptionOrder = r[0]['dateAcceptionOrder'] == "0001-01-01T00:00:00" ? "" : r[0]['dateAcceptionOrder'].split('T')[0];
          this.production = r[0]['production'];
          this.isDone = r[0]['isDone'];
          this.showProgressBar = true;
          if (this.dateAcceptionOrder != "") this.procentProgressBar += 25;
          if (this.production != "") this.procentProgressBar += 25;
          if (this.isDone != "") this.procentProgressBar += 25;
          document.getElementsByClassName('progress-bar')[0].setAttribute("style", `width: ${this.procentProgressBar}%`);
          document.getElementsByClassName('progress-bar')[0].innerHTML = JSON.stringify(this.procentProgressBar);  
        }
      });
  }
}
