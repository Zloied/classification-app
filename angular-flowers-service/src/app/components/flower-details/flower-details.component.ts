import { Component, OnInit } from '@angular/core';
import { Flower } from 'src/app/common/flower';
import { FlowerService } from 'src/app/services/flower.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flower-details',
  templateUrl: './flower-details.component.html',
  styleUrls: ['./flower-details.component.css']
})

/**
 * Presents datail view about specific chosen flower 
 */
export class FlowerDetailsComponent implements OnInit {

  flower: Flower = new Flower();

  constructor(private flowerService: FlowerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleFlowerDetails();
    })
  }

  /**
   * Retrieves data for flower specified by id parameter
   */
  handleFlowerDetails() {
   const theFlowerId: number = +this.route.snapshot.paramMap.get('id');

   this.flowerService.getFlower(theFlowerId).subscribe(
     data => {
       this.flower = data
     }
   )
  }

}
