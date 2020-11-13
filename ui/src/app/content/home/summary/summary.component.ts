import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { AgentPersona, ProfileData } from 'src/app/graphql/interfaces';
import {AllAgentPersonasGQL} from 'src/app/graphql/queries/all-personas-gql'
import {PersonaProfilesGQL} from 'src/app/graphql/queries/persona-profiles-gql'


@Component({
  selector: "summarylist",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.css"]
})
export class SummaryComponent implements OnInit {
  persona: AgentPersona;
  personalist: Observable<AgentPersona[]>;
  profilelist: Observable<ProfileData[]>
  errorMessage:string
  personas_mock:string[] = ["friends","work","developer"] //mock
  profiles_mock:string[] = ["calendar","chat","adacast"] //mock

  constructor( private personas: AllAgentPersonasGQL, private personaProfiles: PersonaProfilesGQL,  private router: Router) {
  }

  async ngOnInit() {
    try {
      this.personalist = this.personas.watch().valueChanges.pipe(map(result=>
        {
          if (!result.errors)
            return result.data.allPersonas//.map(person => <AgentPersona>{id:person.id,name:person.name,avatar:person.avatar})
          this.errorMessage = result.errors[0].message
          return null
        })
      ) 
        const id = {persona_id:"98247590823"}
      this.profilelist = this.personaProfiles.watch(id).valueChanges.pipe(map(result=>
        {
          if (!result.errors)
            return result.data.personaProfiles//.map(person => <AgentPersona>{id:person.id,name:person.name,avatar:person.avatar})
          this.errorMessage = result.errors[0].message
          return null
        }))
    } catch(exception){
        this.errorMessage = exception
    }
  }

  async switch_persona(pid){
    try {
      this.profilelist = this.personaProfiles.watch(pid).valueChanges.pipe(map(result=>
        {
          if (!result.errors)
            return result.data.personaProfiles//.map(person => <AgentPersona>{id:person.id,name:person.name,avatar:person.avatar})
          this.errorMessage = result.errors[0].message
          return null
        }))
    } catch(exception){
        this.errorMessage = exception
    }

  }

}
