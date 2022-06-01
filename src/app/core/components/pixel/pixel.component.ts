import { Component, OnInit } from '@angular/core';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { OfferService } from '../../services/offer.service';

@Component({
  selector: 'app-pixel',
  templateUrl: './pixel.component.html',
  styleUrls: ['./pixel.component.scss']
})
export class PixelComponent implements OnInit {
  offers: any;

  constructor(private _offerService: OfferService) { }

  ngOnInit(): void {
    this._offerService.getOffers().subscribe(r => {
      this.offers = r;
      console.log(this.offers);
      
    });
  }

}
