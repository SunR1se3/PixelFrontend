import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit, HostListener } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  opacity = 0;
  categories: any;
  categoryAvailable : any;
  pathToCategory:Array<string> = [
    '/businessCards',
    '/signs',
    '/souvenirProducts',
    '/documents',
    '/stamps',
    '/polygraphy',
    '/photo'
  ]

  constructor(private _categoryService: CategoryService) { }

  ngOnInit(): void {
    this._categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  @HostListener('window:scroll', ['$event'])

  changeOpacityinHeader() {
    let elem = document.getElementsByTagName('header')[0];
    if (window.pageYOffset > 175) {
      elem.classList.add("background");
    }
    else if (window.pageYOffset < 175) {
      elem.classList.remove("background");
    }
  }

  addOpacity(elem: any, opacity: any) {
    while (opacity < 1) {
      setTimeout(() => {
        opacity += 1;
        elem.style.background = `rgba(1, 1, 1, ${this.opacity})`;
      }, 500);  
    }
  }

  removeOpacity(elem: any, opacity: any) {
    while (opacity > 0) {
      setTimeout(() => {
        opacity -= 1;
        elem.style.background = `rgba(1, 1, 1, ${this.opacity})`;
      }, 500);  
    }
  }
}
