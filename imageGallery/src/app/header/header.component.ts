import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariable } from '../global/global.variables';
import { HeaderService } from '../service/header.service';
import { FilterService } from '../service/filter.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private hService: HeaderService,
    private filter: FilterService
  ) {}

  message = {
    success: '',
  };
  name: any;
  img: any;
  profilepic1: any;
  photo: File = null;

  imageNameForm = this.fb.group({
    imageName: ['', Validators.required],
  });

  profileForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  profilePic = this.fb.group({
    photo: [''],
  });
  ngOnInit() {
    this.name = localStorage.getItem('name');
  }

  // Get profile
  editProfile() {
    this.hService.getProfile().subscribe(
      (res) => {
        this.profileForm = new FormGroup({
          name: new FormControl(res.body.name),
          email: new FormControl(res.body.email),
          password: new FormControl(),
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Get profile
  updateProfile() {
    this.hService.updateProfile(this.profileForm.value).subscribe(
      (res) => {
        let ref = document.getElementById('editprofileclose');
        ref?.click();
        window.localStorage.removeItem('name');
        window.localStorage.setItem('name', res.body.name);
        window.location.reload();
        console.log(res);
        this.message.success = 'Profile details updated successfully';
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout() {
    this.hService.logout().subscribe(
      (res) => {
        console.log(res);
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('folder_id');
        this.router.navigate(['/login']);
      },
      (err) => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('folder_id');
        this.router.navigate(['/login']);
        console.log(err);
      }
    );
  }

  searchImage() {
    let serchid: any = document.getElementById('serchid');
    this.filter.setFilter(serchid.value);
    // console.log(serchid.value);
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

  profilePicture() {
    const fd = new FormData();
    fd.append('profilepic', this.photo);
    this.hService.profileImage(fd).subscribe(
      (res) => {
        window.location.reload();
        let ref = document.getElementById('profilepictureclose');
        ref?.click();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
