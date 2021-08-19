import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollDataService } from '../../services/poll-data-service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {
  poll: any | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pollDataService: PollDataService) {
  }

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const pollId = routeParams.get('pollId');

    this.pollDataService
      .getPoll(pollId || "")
      .subscribe(res => {
        console.log("passou aqui");
        this.processPollData(res.payload.data());
      });
  }

  processPollData(pollData: any) {
    if (!pollData) return;

    this.poll = {
      title: pollData.title,
      creation: pollData.creation,
      votes: pollData.votes,
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
}