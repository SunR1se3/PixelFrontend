import { Component, OnInit } from '@angular/core';
import { WareService } from '../../services/ware.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  wares: any;

  pathToWare: Array<string> = [
    'documents/tirajirovanie',
    'documents/laminate',
    'documents/copy-and-print',
    'documents/large-format-print',
    'documents/scanning'
  ]

  constructor(private _wareService: WareService) { }

  ngOnInit(): void {
    this._wareService.getWares().subscribe(data => {
      this.wares = data;
    })
  }

}
