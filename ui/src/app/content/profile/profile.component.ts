import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Agent, Profile } from 'src/app/graphql/queries/myprofile-gql';


@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  user: Agent //Promise<User> | null = null
  errorMessage:string = ""
  appfields: FormGroup
  submitted = false;
  inputFields = ["name","age","telephone"] //sample
  data = ["josh","21","034534342"]
  personas = ["work","personal"]

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
    const profile:Profile = {username:sessionStorage.getItem("username")}
    this.user = <Agent>{id:sessionStorage.getItem("userhash"),profile}
    this.user.avatar = sessionStorage.getItem("avatar")
    this.appfields = this.fb.group({
      Rows : this.fb.array([])
    });
      this.populateForm()
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
  }

  logout(){
    console.log("logging out")
    sessionStorage.clear()
    this.router.navigate(["signup"]);
  }
}

