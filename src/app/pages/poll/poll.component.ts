import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';
import { PollDataService } from '../../services/poll-data-service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {
  userId: string;
  pollId: string | null;
  poll: any | undefined;
  votationOpen: boolean = false;
  votationClosed: boolean = false;
  optionSelected: number = 0;
  allowEdit = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pollDataService: PollDataService) {

      this.authService.auth.user.subscribe(user => {
        if (user) {
          this.userId = user.uid;
        }
      });      
  }

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.pollId = routeParams.get('pollId');

    if (!this.pollId) return;

    this.pollDataService
      .getPoll(this.pollId)
      .subscribe(res => {
        this.processPollData(res.payload.data());
      });
  }

  processPollData(pollData: any) {
    if (!pollData) return;

    this.allowEdit = (pollData.userId == this.userId);

    this.poll = {
      title: pollData.title,
      creation: pollData.creation,
      userId: pollData.userId,
      votes: pollData.votes,
      imageUrl: pollData.imageUrl,
      options: []
    }

    const optionCount = pollData.optionCount || 0;
    const optionList: any[] = [];

    for (let index = 1; index <= optionCount; index++) {
      const value = pollData[`${index}_option`];
      const votes = pollData[`${index}_votes`];
      const percentage = votes / pollData.votes;

      const option = {
        index,
        value,
        votes,
        percentage,
      }

      optionList.push(option);
    }

    let sortedList = optionList.sort((a, b) => b.votes - a.votes);

    this.poll.options = sortedList;
  }

  onEditPollClick() {
    this.router.navigate(['/edit-poll', this.pollId]);
  }

  onVotePollClick() {
    this.votationOpen = true;    
  }

  onOptionSelection(option: any) {
    option.voted = true;
    this.votationClosed = true;

    if (!this.pollId) return;

    var editedPoll: any = {
      votes: this.poll.votes + 1  
    };

    editedPoll[`${option.index}_votes`] = option.votes + 1;

    this.pollDataService.editPoll(this.pollId, editedPoll)
      .then(result => {
        console.log("Enquete atualizada com sucesso");
      }).catch(error => {
        alert("Oops, houve um erro ao tentar atualizar a enquete!")
        console.log(error);
      });

  }
}