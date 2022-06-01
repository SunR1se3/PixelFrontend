import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CalculatorDocumentService } from 'src/app/core/services/calculator-document.service';
import { DocumentSettingsService } from 'src/app/core/services/document-settings.service';
import { FilesService } from 'src/app/core/services/files.service';
import { OrderService } from 'src/app/core/services/order.service';
import { WareService } from 'src/app/core/services/ware.service';
import { Router } from '@angular/router';
import $ from "jquery";
import * as bootstrap from "bootstrap";
import { HronologyService } from 'src/app/core/services/hronology.service';

@Component({
  selector: 'app-tirajirovanie',
  templateUrl: './tirajirovanie.component.html',
  styleUrls: ['./tirajirovanie.component.scss']
})
export class TirajirovanieComponent implements OnInit {
  // Данные параметров для тиражирования документов
  data;
  sizeData: Array<any> = [];
  materialData: Array<any> = [];
  densityData: Array<any> = [];
  colorData: Array<any> = [];


  // Вычисление дней
  currentDate = new Date();
  nextDay = new Date(this.currentDate);
  nDay = new DatePipe('en-Us');

  // Данные с формы параметров
  tirajForm = new FormGroup({
    size: new FormControl('3df0d04e-cbf8-4051-6405-08da36af951c'),
    material: new FormControl('ba5928fc-9195-431d-6409-08da36af951c'),
    density: new FormControl('127f1e97-841d-4ba0-6414-08da36af951c'),
    color: new FormControl('f5e50e87-eb3d-4e17-641a-08da36af951c'),
    count: new FormControl('100'),
    deadlineDate: new FormControl(this.nDay.transform(this.getNextDay(), 'yyyy-MM-dd')),
    colors: new FormControl('')
  })

  // Данные с формы информации о клиенте
  userInfo = new FormGroup({
    username: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    file: new FormControl('', [Validators.required]),
    FormFile: new FormControl('')
  })

  // Итоговая цена
  finalPrice;

  // Видимость таблицы с результатом
  showTable = false;

  // Вся информация, которая будет отправлена
  finalStringData: string = "";

  countColorInput: Array<any> = [1];
  colors: Array<string> = ['#000000'];
  colorsString: string = "";

  formData = new FormData();

  uploadButton = false;

  constructor(private _router: Router, private _calculatorDocuments: CalculatorDocumentService, private _documentSettings: DocumentSettingsService,
     private _orderService: OrderService, private _filesService: FilesService, private _orderHronologyService: HronologyService) { }

  ngOnInit(): void {
    this.getNextDay();
    this.getData();
    var popovers = document.getElementsByClassName('informer');
    var popover;
    console.log(popovers);
    for (let i = 0; i < popovers.length; i++)
      popover = new bootstrap.Popover(popovers[i]);
  }

  get sizeControl() {
    return this.tirajForm.get('size');
  }

  get materialControl() {
    return this.tirajForm.get('material');
  }

  get densityControl() {
    return this.tirajForm.get('density');
  }

  get colorControl() {
    return this.tirajForm.get('color');
  }

  get countControl() {
    return this.tirajForm.get('count');
  }

  get deadlineControl() {
    return this.tirajForm.get('deadlineDate');
  }

  get colorsControl() {
    return this.tirajForm.get('colors');
  }

  get usernameControl() {
    return this.userInfo.get('username');
  }

  get phoneControl() {
    return this.userInfo.get('phone');
  }

  get emailControl() {
    return this.userInfo.get('email');
  }

  get fileControl() {
    return this.userInfo.get('file');
  }

  get FormFileControl() {
    return this.userInfo.get('FormFile');
  }

  saveFile(event) {
    if (event.target.files.length > 0) {
      const f: File = event.target.files[0];
      this.formData.append("data", f);
    }
  }

  createOrder(details: string) {
    if (this.userInfo.invalid) { this.userInfo.markAllAsTouched(); return; }
    this.uploadButton = true;
    const newData = {
      Fio: this.usernameControl?.value,
      PhoneNumber: this.phoneControl?.value,
      Email: this.emailControl?.value,
      File: this.fileControl?.value,
      detailsOrder: details
    }
    
    this._orderService.createOrder(newData)
      .subscribe(r => {
        this._orderService.getLastOrder().subscribe(r => {
          const orderHronology = {
            DateCreationOrder: new Date().toISOString(),
            Production: false,
            isDone: false,
            IdOrder: r['id']
          }
          const emailData = {
            idOrder: r['id'],
            email: this.emailControl?.value
          }
          this._orderService.sendEmail(emailData);
          this._orderHronologyService.addOrderHronology(orderHronology);
        });    
      });
    this._filesService.saveFile(this.formData)
      .subscribe(r => {
        let warning = false;
        if (r) warning = true;
        this._router.navigate(['/order-successfull'], { queryParams: { isBadDoc: warning } });
      });
    //console.log(newData);
  }

  size: any;
  material: any;
  density: any;
  color: any;

  dataToString() {
    this._documentSettings.getDocumentSettingById(this.sizeControl?.value)
      .toPromise().then(r => {
        for (let key in r)
          if (key == 'title') this.size = r[key];
      });
    this._documentSettings.getDocumentSettingById(this.materialControl?.value)
      .toPromise().then(r => {
        for (let key in r)
          if (key == 'title') this.material = r[key];
      });
    this._documentSettings.getDocumentSettingById(this.densityControl?.value)
      .toPromise().then(r => {
        for (let key in r)
          if (key == 'title') this.density = r[key];
      });
    this._documentSettings.getDocumentSettingById(this.colorControl?.value)
      .toPromise().then(r => {
        for (let key in r)
          if (key == 'title') this.color = r[key];
      });

    let countCopies = this.countControl?.value;
    let deadline = this.deadlineControl?.value;
    setTimeout(() => {
      this.finalStringData = this.size + ";" + this.material + ";" + this.density + ";" + this.color + ";" + countCopies + ";" + deadline + ";" + this.finalPrice;
      this.createOrder(this.finalStringData);
    }, 100);
  }

  getData() {
    let i = 0;
    this._documentSettings.getDocumentSettings().subscribe(d => {
      this.data = d;
      for (let item of this.data) {
        if (i >= 0 && i < 4) this.sizeData[i] = item;
        if (i >= 4 && i < 14) this.materialData[i - 4] = item;
        if (i >= 14 && i < 20) this.densityData[i - 14] = item;
        if (i >= 20 && i < this.data.length) this.colorData[i - 20] = item;
        i++;
      }
    });
  }

  getNextDay() {
    return this.nextDay.setDate(this.currentDate.getDate() + 1);
  }

  calculateCost() {
    const newData = {
      IdSize: this.sizeControl?.value,
      IdMaterial: this.materialControl?.value,
      IdDensity: this.densityControl?.value,
      IdColor: this.colorControl?.value,
      Count: this.countControl?.value,
      Deadline: this.deadlineControl?.value
    }


    this.finalPrice = this._calculatorDocuments.getPriceDocument(newData).subscribe(data => {
      this.finalPrice = this.isBlackPrint() ? JSON.stringify(data) : parseFloat(JSON.stringify(data)) + this.countColorInput.length * 3 * this.countControl?.value;
    });

    this.showTable = true;

  }

  onColorCountChange() {
    this.countColorInput.length = 0;
    this.colors.length = 0;

    this.colorData.forEach(item => {
      if (this.colorControl?.value == item.id)
        for (let i = 0; i < Number.parseInt(item.title.split(" ")[0]) + Number.parseInt(item.title.split(" ")[2]); i++) {
          this.countColorInput[i] = i;
          this.colors[i] = "#000000";
        }
    });
  }

  onColorChange() {
    let colorFormControls = document.getElementsByClassName('form-control-color') as unknown as HTMLInputElement;
    for (let i = 0; i < this.countColorInput.length; i++) {
      this.colors[i] = colorFormControls[i].value;
    }
    //console.log(this.isBlackPrint());
  }

  isBlackPrint() {
    let counter = 0;
    this.colors.forEach(item => {
      if (item == "#000000") counter++;
    });

    if (counter == this.countColorInput.length) return true; else return false;
  }

  transforColorsToString() {
    for (let i = 0; i < this.colors.length; i++) {
      this.colorsString += this.colors[i] + " ";
    }
  }
}
