import { Component, OnInit } from '@angular/core';
import { FlowerCategory } from 'src/app/common/flower-category';
import { FlowerService } from 'src/app/services/flower.service';

@Component({
  selector: 'app-flower-category-menu',
  templateUrl: './flower-category-menu.component.html',
  styleUrls: ['./flower-category-menu.component.css']
})

/**
 * Shows sidebar menu with categories of flowers for thr desktop version
 */
export class FlowerCategoryMenuComponent implements OnInit {

  flowerCategories: FlowerCategory[];
  constructor(private flowerService: FlowerService) { }

  ngOnInit(): void {
    this.listFlowerCategories();
  }

  listFlowerCategories() {
   this.flowerService.getFlowerCategories().subscribe(
     data => {
       this.flowerCategories = data;
     }
   );
  }

}
