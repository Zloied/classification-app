import { Directive, HostListener, HostBinding,EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appDragDropeDirective]'
})
export class DragDropeDirectiveDirective {

  @Output() onFileDropped = new EventEmitter<any>();

  @HostBinding('style.background-color') private background = '#f5fcff'
  @HostBinding('style.opacity') private opacity = '1'

  
  //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8'

    console.log("drag over");
    
  }
  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'

    console.log("drag leave");
    
  }
  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      console.log(`File droped ${files.length} files`);
      this.onFileDropped.emit(files)
      //this.onFileDropped.emit(files)
    }

  }

}
