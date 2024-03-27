import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  isSidenavExpanded: boolean;

  ngOnInit(): void {
    this.isSidenavExpanded = false;
  }

  onSideBarToggle() {
    this.isSidenavExpanded = !this.isSidenavExpanded;
  }
}
