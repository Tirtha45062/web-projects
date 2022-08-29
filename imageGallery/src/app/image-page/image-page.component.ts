import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariable } from '../global/global.variables';
import { ImageService } from '../service/image.service';
import { FilterService } from '../service/filter.service';
@Component({
  selector: 'app-image-page',
  templateUrl: './image-page.component.html',
  styleUrls: ['./image-page.component.scss'],
})
export class ImagePageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private imgService: ImageService,
    private filter: FilterService
  ) {}
  photo: File = null;
  img: any;
  imageArray: any = [];
  totalLength: string;
  page: number = 1;
  largeimg: any;
  title: any;
  gallery_id: any;
  isLoading = true;
  image_id: any;

  uploadForm = this.fb.group({
    photo: ['', Validators.required],
    title: ['', Validators.required],
  });

  ngOnInit() {
    this.gallery_id = GlobalVariable.gallery_id;
    if (this.gallery_id == '') {
      this.gallery_id = localStorage.getItem('folder_id');
      this.getImages(this.gallery_id);
    } else {
      window.localStorage.setItem('folder_id', this.gallery_id);
      this.getImages(this.gallery_id);
    }
  }

  onSubmit() {
    const fd = new FormData();
    fd.append('photo', this.photo);
    fd.append('title', this.uploadForm.value.title);
    fd.append('gallery_id', this.gallery_id);
    this.uploadImage(fd);
  }

  uploadImage(fd) {
    let ref = document.getElementById('imageclose');
    ref?.click();
    this.imgService.uploadImage(fd).subscribe(
      (res) => {
        this.getImages(this.gallery_id);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getImages(gallery_id: any) {
    var data = {
      gallery_id: gallery_id,
    };
    this.imageArray = [];
    this.imgService.getImages(data).subscribe(
      (res) => {
        this.isLoading = false;
        this.imageArray = res.body;
        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onselectFile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.img = event.target.result;
        this.photo = e.target.files[0];
      };
    }
  }

  largeimage(url: any, title: any) {
    this.largeimg = url;
    this.title = title;
  }

  deleteImage(id: any) {
    this.image_id = id;
  }

  confirmDelete() {
    this.imgService.deleteImage(this.image_id).subscribe(
      (res) => {
        let ref = document.getElementById('imageDelete');
        ref?.click();
        this.getImages(this.gallery_id);
        this.image_id = null;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
