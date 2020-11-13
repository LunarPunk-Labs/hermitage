import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { AgentPersona } from 'src/app/graphql/interfaces';

@Component({
  selector: "summarylist",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.css"]
})
export class SummaryComponent implements OnInit {
  persona: AgentPersona;
  personalist: Observable<AgentPersona[]>;
  errorMessage:string
  personas:string[] = ["friends","work","developer"] //mock
  profiles:string[] = ["calendar","chat","adacast"] //mock

  constructor(  private router: Router) {  //private agents: AllPersonasGQL, AllProfilesGQL
  }

  ngOnInit() {

    //TODD.. query summary data
    /*try {
      this.personalist = this.agents.watch().valueChanges.pipe(map(result=>{
        if (!result.errors)
          return result.data.allAgents.map(agent => <Agent>{id:agent.id,profile:agent.profile})
        this.errorMessage = result.errors[0].message
        return null
      }))
    } catch(exception){
        this.errorMessage = exception
    }*/
  }

}
