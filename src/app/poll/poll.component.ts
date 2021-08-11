import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Poll } from '../models/poll.model';
import { PollDataService } from '../services/poll-data-service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {
  poll: any | undefined;

  constructor(private route: ActivatedRoute, private pollDataService: PollDataService) {
    
  }

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const pollId = routeParams.get('pollId');

    
    this.pollDataService
    .getPoll(pollId || "")
    .subscribe(res => {
        console.log(res.payload.data());

        this.poll = res.payload.data(); 
      });
  }

}
