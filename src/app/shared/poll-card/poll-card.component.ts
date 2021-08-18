import { Component, Input, OnInit } from '@angular/core';
import { Poll } from 'src/app/models/poll.model';

@Component({
  selector: 'app-poll-card',
  templateUrl: './poll-card.component.html',
  styleUrls: ['./poll-card.component.scss']
})
export class PollCardComponent implements OnInit {
  @Input() poll: Poll;

  constructor() { }

  ngOnInit(): void {
  }

}
