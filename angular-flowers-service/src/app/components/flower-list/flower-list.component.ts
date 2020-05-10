import { Component, OnInit } from '@angular/core';
import { FlowerService } from 'src/app/services/flower.service';
import { Flower } from 'src/app/common/flower';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flower-list',
  templateUrl: './flower-list-grid.component.html',
  styleUrls: ['./flower-list.component.css']
})

/**
 * Responsible for bulk view fo flowers such as default catalog and search results 
 */
export class FlowerListComponent implements OnInit {

  flowers: Flower[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  //default pegination values
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  previousKeyword: string = null;

  constructor(private flowerService: FlowerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listFlowers();
    });
  }

  /**
   * Calls method that retrieves pageneted list of flowers which match the search criteria or all flowers by default 
   */
  listFlowers() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchFlowers();
    }
    else {
      this.handleListFlowers();
    }
  }

  /**
   * Retrieves flowers object specified by category id default id starts as 1 
   */
  handleListFlowers() {
    
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      // no category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    // reset page number if category id has been changed
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    console.log(`curreentCategoryId=${this.currentCategoryId}, pageNumber=${this.thePageNumber}`);

    this.flowerService.getFlowerListPaginate(this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId)
      .subscribe(this.processResult());
  }

  /**
   * Peforms flower seach based on inserted keyword
   */
  handleSearchFlowers() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')

    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    this.flowerService.searchFlowersPaginate(this.thePageNumber - 1, this.thePageSize,
      theKeyword).subscribe(this.processResult())

  }

  /**
   * Maps the data recieved from a Rest call
   */
  processResult() {
    return data => {
      this.flowers = data._embedded.flowers;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
      console.log("pagesize " + data.page.size + " total elements " + data.page.totalElements);


    }
  }

  /**
   * Changes current page size and reloads flowers data
   * @param pageSize - new page size to be set
   */
  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listFlowers();
  }
}
