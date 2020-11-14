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

  constructor( private personas: AllAgentPersonasGQL, private personaProfiles: PersonaProfilesGQL,  private router: Router) {
  }

  ngOnInit() {
    try {
      this.personalist = this.personas.watch().valueChanges.pipe(map(result=>
        {
          if (!result.errors){
            this.profilelist = this.personaProfiles.watch({persona_id:result.data.allPersonas[0].id}).valueChanges.pipe(map(result=>
              {
                if (!result.errors)
                  return result.data.personaProfiles
                this.errorMessage = result.errors[0].message
                return null
              }))
            return result.data.allPersonas
          }
          this.errorMessage = result.errors[0].message
          return null
        })
      ) 
    } catch(exception){
        this.errorMessage = exception
    }
  }

  switch_persona(e:any){
    try {
      this.profilelist = this.personaProfiles.watch({persona_id:e.target.value}).valueChanges.pipe(map(result=>
        {
          if (!result.errors)
            return result.data.personaProfiles
          this.errorMessage = result.errors[0].message
          return null
        }))
    } catch(exception){
        this.errorMessage = exception
    }

  }

}
