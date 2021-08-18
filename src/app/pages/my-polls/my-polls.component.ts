import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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

  constructor(private pollDataService: PollDataService,
    private authService: AuthService,
    private router: Router) {

    this.authService.auth.user.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.userPolls = this.pollDataService.getPollByUser(this.userId);
      }
    });

  }

  ngOnInit(): void {
  }

  onEditItemClick(pollId: string) {
    this.router.navigate(['/edit-poll', pollId]);
  }

  onDeleteItemClick(pollId: string) {
    var result = window.confirm('Deseja realmente excluir este item ?');

    console.log(result, pollId);
    // ${pollId}
  }
}
