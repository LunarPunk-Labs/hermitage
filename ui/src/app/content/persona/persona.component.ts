import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { AgentPersona } from 'src/app/graphql/interfaces';


@Component({
  selector: "app-persona",
  templateUrl: "./persona.component.html",
  styleUrls: ["./persona.component.css"]
})
export class PersonaComponent implements OnInit {
  user: AgentPersona //Promise<User> | null = null
  errorMessage:string = ""

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    if (!sessionStorage.getItem("userhash"))
      this.router.navigate(["signup"]);
  }

  logout(){
    console.log("logging out")
    sessionStorage.clear()
    this.router.navigate(["signup"]);
  }
}

