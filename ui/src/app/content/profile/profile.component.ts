import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AgentPersona } from 'src/app/graphql/interfaces';


@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  user: AgentPersona //Promise<User> | null = null
  errorMessage:string = ""
  appfields: FormGroup
  editing = false;
  inputFields = ["username","password","network"] //will come form app
  visibility = ["Public","Private","Public"] //from holovault
  data = ["Josh","********","odyssey"] //from holovault
  personas = ["work","friends","finance","hacker"] //from holovault

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  get formArr() {
    return this.appfields.get("Rows") as FormArray;
  }

  ngOnInit() {
    if (!sessionStorage.getItem("userhash"))
      this.router.navigate(["signup"]);
    const username = sessionStorage.getItem("username")
    this.user = <AgentPersona>{id:sessionStorage.getItem("userhash"),name:username}
    this.user.avatar = sessionStorage.getItem("avatar")
    this.appfields = this.fb.group({
      Rows : this.fb.array([])
    });
      this.populateForm()
      if (this.router.url.endsWith("edit"))
        this.editing = true
  }

  populateForm(){
    for (let i = 0; i < this.data.length; i++ ) {
        this.formArr.push(
          new FormControl(this.data[i])
        )
    }
  }

  sendData(){
    console.log(this.appfields.getRawValue())
    this.router.navigate(["home/"]);
  }

  logout(){
    console.log("logging out")
    sessionStorage.clear()
    this.router.navigate(["signup"]);
  }
}

