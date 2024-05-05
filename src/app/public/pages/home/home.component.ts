import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {CountService} from "../../../owners/services/count.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  idCount: number = 0;
  constructor(private countService: CountService) {
  }


  ngOnInit(){
    this.countService.getAll().subscribe((data: any) => {
      this.idCount = data.length;
    });
  }


}
