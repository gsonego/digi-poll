import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth-service';
import { PollDataService } from '../../services/poll-data-service';

@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.component.html',
  styleUrls: ['./my-polls.component.scss']
})
export class MyPollsComponent implements OnInit {
  userId: string = "";
  userPolls: Observable<any> | undefined;

  constructor(private pollDataService: PollDataService, private authService: AuthService) {
    authService.auth.user.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.userPolls = pollDataService.getPollByUser(this.userId);
      }
    });    
   }

  ngOnInit(): void {
  }

  onEditItemClick(pollId: string) {
    alert(`Edit item: ${pollId}!!`);
  }

  onDeleteItemClick(pollId: string) {
    alert(`Excluir item: ${pollId}!!`);
  }
}
