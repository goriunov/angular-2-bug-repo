import {Component, OnInit} from '@angular/core';


declare var io: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  sockets: any;
  all_users :any[] = [];


  ngOnInit(){

    this.sockets = io.connect();
    this.sockets.emit('create user' , 'Some name');

    this.sockets.on('players in' , (users) =>{
        this.all_users = users;

    });

  }
}
