import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import $ from "jquery";
import { FilesService } from '../../services/files.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-successfull',
  templateUrl: './order-successfull.component.html',
  styleUrls: ['./order-successfull.component.scss'],
})
export class OrderSuccessfullComponent implements OnInit {
  isBadDoc: any;
  idOrder: any;
  detailsOrder: any;
  naming = ['Формат бумаги: ', 'Материал: ', 'Плотность бумаги: ', 'Цветность: ', 'Количество экземпляров: '];
  deadline: any;
  price: any;

  fileInfo = new FormGroup({
    file: new FormControl('', [Validators.required]),
  })

  formData = new FormData();

  uploadButton = false;

  constructor(private _activatedRoute: ActivatedRoute, private _orderService: OrderService, private _fileService: FilesService) { }

  ngOnInit(): void {
    let body = document.getElementsByTagName("body")[0];
    if (body != undefined) {}
    body.classList.remove("modal-open");
    body.removeAttribute("style");
    body.removeAttribute("data-bs-overflow");
    body.removeAttribute("data-bs-padding-right");

    if (document.getElementsByClassName("modal-backdrop")[0]) {
      for (let i = 0; i < document.getElementsByClassName("modal-backdrop").length; i++)
        document.getElementsByClassName("modal-backdrop")[i].remove();
    }
    this._activatedRoute.queryParams.subscribe(params => {
      this.isBadDoc = params['isBadDoc'];
    });
    this._orderService.getLastOrder().subscribe(r => {
      this.idOrder = r['id'];
      let tempString = r['details'];
      this.detailsOrder = tempString.split(';');
      
      for (let i = 0; i < this.detailsOrder.length - 2; i++) {
        if (i == 3) this.detailsOrder[i] = this.detailsOrder[i].split(' ')[0] + "+" + this.detailsOrder[i].split(' ')[3];
        this.detailsOrder[i] = this.naming[i] + this.detailsOrder[i];
      }
      this.deadline = this.detailsOrder[this.detailsOrder.length - 2];
      this.price = this.detailsOrder[this.detailsOrder.length - 1];
      this.detailsOrder.splice(this.detailsOrder.length - 2, 2);
    })
  }

  get fileControl() {
    return this.fileInfo.get('file');
  }

  ignoreWarning() {
    this.isBadDoc = 'false';
  }

  saveFile(event) {   
    if (event.target.files.length > 0) {
      const f: File = event.target.files[0];
      this.formData.append("data", f);
    }
  }

  uploadFile() {
    if (this.fileInfo.invalid) { this.fileInfo.markAllAsTouched(); return; }
    this.uploadButton = true;
    this._fileService.saveFile(this.formData).subscribe(r => {
      this.isBadDoc = 'false';
    });
  }
}
