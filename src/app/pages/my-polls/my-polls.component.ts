import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    if (!result) return;

    this.pollDataService
      .deletePoll(pollId)
      .then(result => {
        const msg = `Enquete ${pollId} excluída com sucesso!`;
        alert(msg);
        console.log(msg);
      })
      .catch(error => {
        alert("Desculpe, houve um erro ao tentar excluir enquete!");
        console.error(error);
      });
  }

  onActivatePollClick(pollId: string) {
    var result = window.confirm("Deseja realmente ativar a enquete ?");

    if (!result) return;

    this.pollDataService
      .activatePoll(pollId)
      .then(res => {
        // no feedback needed
      })
      .catch(err => {
        alert("Desculpe, houve um erro ao tentar ativar a enquete.")
        console.error(err);
      });
  }
}
