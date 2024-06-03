import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit {
  constructor(private router:Router){

  }
  @ViewChild('img', { static: true }) imgElement!: ElementRef
  @ViewChild('list', { static: true }) listElement!: ElementRef
  @ViewChild('search', { static: true }) searchElement!: ElementRef
  @ViewChild('searchBox', { static: true }) searchBoxElement!: ElementRef
  searchClick() {
    this.imgElement.nativeElement.style.display = "none"
    this.listElement.nativeElement.style.display = "none"
    this.searchElement.nativeElement.style.display = "none"
    this.searchBoxElement.nativeElement.style.display = "block"
  }
  moveFocusTo(){
    this.router.navigate(['/list',1])
  }
  ngOnInit(): void {
    this.searchBoxElement.nativeElement.style.display = "none"
  }
}
