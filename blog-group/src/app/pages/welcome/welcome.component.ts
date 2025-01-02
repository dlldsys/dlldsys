import { Component, OnInit } from '@angular/core';
import { BaseHttpService } from '../../base.http.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  imports:[NzTableModule,CommonModule,DatePipe],
  standalone: true
})
export class WelcomeComponent  implements OnInit{
  list:any=[];
  constructor(
    private http:BaseHttpService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.http.getArticlesList().subscribe(res=>{
      console.log(res);
      this.list=res;
    })
  }

  contentFormat(str:string){
    return decodeURIComponent(atob(str)).slice(0,30);
  }
}
