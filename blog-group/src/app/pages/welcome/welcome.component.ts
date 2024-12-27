import { Component, OnInit } from '@angular/core';
import { BaseHttpService } from '../../base.http.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent  implements OnInit{
  constructor(
    private http:BaseHttpService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.http.getArticlesList().subscribe(res=>{
      console.log(res)
    })
  }
}
