import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../service/header.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor( private hService: HeaderService,) {}
  name:any;
  profilepic1: any;
  profile = false;
  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.getProfilePic();
  }


  getProfilePic() {
    this.profilepic1 = null;
    this.hService.getProfilePic().subscribe(
      (res) => {
        if (res.body[0] != null) {
          this.profilepic1 = res.body[0].profilepicPath;
          this.profile = true;
        } else {
          this.profilepic1 = null;
          this.profile = false;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
