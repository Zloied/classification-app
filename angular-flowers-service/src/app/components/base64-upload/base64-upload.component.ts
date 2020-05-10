import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { FlowerService } from 'src/app/services/flower.service';
import { ClassificationService } from 'src/app/services/classification.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Flower } from 'src/app/common/flower';


@Component({
  selector: 'app-base64-upload',
  templateUrl: './base64-upload.component.html',
  styleUrls: ['./base64-upload.component.css']
})

/**
 * Responsible for uploading and processing an image that that has to be classified.
 * After classification shows recieved possible outcomes. 
 */
export class Base64UploadComponent implements OnInit {

  localUrl: any;
  sizeOFCompressedImage: number;
  uploader: FileUploader;
  imageData: string;
  form: FormGroup;
  fileReader: FileReader;
  uploaded: boolean = false;
  processing: boolean;
  flower: Flower;
  

  //data for classification response
  status: string;
  message: string;
  className: string;
  probability: number;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private router: Router, private fb: FormBuilder, private classificationService: ClassificationService, private flowerService: FlowerService, private imageCompress: NgxImageCompressService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {

    this.form = this.fb.group({
      image: null
    });
  }

  /**
   * Reacts on uploaded file event by checking the size of the image and resizing it if necessary before it can be used in the rest call.
   * @param event uploaded by directive file
   */
  onFileChange(event: any) {
    let reader = new FileReader();
    
    if (event.length > 0) {
      
      let file = event[0];
      reader.readAsDataURL(file);

      console.log("encoded file: " + reader.result);
      reader.onload = (event: any) => {

        if (this.imageCompress.byteCount(reader.result) / (1024 * 1024) > 1) {
          console.log(" greater than 1mb " + file.name);
          this.compressFile(event.target.result, file.name)
        } else {
          this.imageData = (reader.result as string).split(',')[1]
        }
                
      };
    }
    this.uploaded = true
  }

  /**
   * Reacts on users submition of inserted data by reseting validation parameters and calling classification method 
   */
  onSubmit() {
    this.processing = true;
    this.uploaded = false;
    let name: string;

    this.findFlower() 
  }

  clearFile() {
    this.imageData = null;
  }

  /**
   * compresses inserted image with default parameters
   * @param image - an image file to resize
   * @param fileName - name of file to resize
   */
  compressFile(image, fileName: string) {
    var orientation = -1;

    this.imageCompress.compressFile(image, orientation, 50, 50).then(
      result => {
        this.sizeOFCompressedImage = this.imageCompress.byteCount(result) / (1024 * 1024)
        this.imageData = (result as string).split(',')[1]
      });
  }

  /**
   * Calls service responisble for Rest calls to the remoute classification service 
   */
  async findFlower(){
    let className: string;

    await this.classificationService.detectFlowerClass(this.imageData).then(res => className=res[0]);
    this.flowerService.searchFlowers(className).subscribe(data => {
      this.flower = data[0]
    });

    this.processing = false;
  }

}

