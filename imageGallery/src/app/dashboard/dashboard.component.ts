import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FolderService } from '../service/folder.service';
import { GlobalVariable } from '../global/global.variables';
import { AccountService } from '../service/account.service';
import { ImageService } from '../service/image.service';
import { FilterService } from '../service/filter.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fservice: FolderService,
    private ACService: AccountService,
    private imgService: ImageService,
    private filter: FilterService
  ) {}

  folderArray: any = [];
  accountArray: any = [];
  randomImage: any = [];
  allImageArray: any = [];

  largeimg: any;
  title: any;
  isLoading = true;
  folder_id: any;
  image_id: any;

  folderForm = this.fb.group({
    name: ['', Validators.required],
  });
  ngOnInit() {
    window.localStorage.removeItem('folder_id');
    this.getFolders();
   // this.getAccounts();
    this.getAllImage();
  }

  onSubmit() {
    this.createFolder(this.folderForm.value);
  }

  getFolders() {
    this.folderArray = [];
    this.fservice.getFolders().subscribe(
      (res) => {
        this.isLoading = false;
        this.folderArray = res.body;
        this.getimages();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getimages() {
    for (let i = 0; i < this.folderArray.length; i++) {
      var data = {
        gallery_id: this.folderArray[i].id,
      };
      this.imgService.getImages(data).subscribe((res) => {
        var randomNumber = Math.floor(Math.random() * res.body.length);
        var randomImg = res.body[randomNumber].imagePath;
        this.randomImage[i] = randomImg;
        //console.log(this.randomImage);
      });
    }
  }

  createFolder(data: any) {
    this.fservice.createFolder(data).subscribe(
      (res) => {
        let ref = document.getElementById('folderclose');
        ref?.click();
        this.getFolders();
        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllPhoto(id: any) {
    GlobalVariable.gallery_id = id;
    //console.log(id);
    this.router.navigate(['/gallery/image']);
  }

  // getAccounts() {
  //   this.ACService.getAccounts().subscribe(
  //     (res) => {
  //       this.accountArray = res.body;
  //       //console.log(res);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  getAllImage() {
    this.fservice.getAllImage().subscribe(
      (res) => {
        this.allImageArray = res.body;
         console.log(res.body);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  largeimage(url: any, title: any) {
    this.largeimg = url;
    this.title = title;
  }

  folderDelete(id: any) {
    this.folder_id = id;
  }
  confirmDelete() {
    this.fservice.deleteFolder(this.folder_id).subscribe(
      (res) => {
        let ref = document.getElementById('folderDelete');
        ref?.click();
        this.getFolders();
        window.location.reload();
        this.folder_id = null;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteImage(id: any) {
    this.image_id = id;
  }

  confirmDeleteImage() {
    this.imgService.deleteImage(this.image_id).subscribe(
      (res) => {
        let ref = document.getElementById('imageDelete1');
        ref?.click();
        this.getAllImage();
        this.image_id = null;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
