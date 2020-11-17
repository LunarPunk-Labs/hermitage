import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
//import { CreateProfileGQL } from 'src/app/graphql/queries/get-profile-gql';
//import { MyProfileGQL,Agent } from 'src/app/graphql/queries/persona-profiles-gql'
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  //user: Agent;
  registered: Promise<boolean> = new Promise(()=>{return true});
  errorMessage: string = ""
  avatarLink: string = "../../assets/img/avatar_placeholder.jpg"

  constructor(
    private fb: FormBuilder,
    //private createProfile: CreateProfileGQL,
    //private myprofile:MyProfileGQL,
    private router: Router
  ) {}

  profileForm = this.fb.group({
    handle: ["", Validators.required],
    avatar: ["", Validators.required]
  });

  ngOnInit() {
    this.registered = new Promise(()=>{return true}); // this.isRegistered().then((result)=>{
      //if(result)
      //this.errorMessage = "You are registered as: "+this.user.profile.username
      //return result
    //}) as Promise<boolean>
  }

 async signUp(){
  this.setAndRoute()
    /*console.log("signup called")
    const handle:string = this.profileForm.get("handle").value;
    this.avatarLink = this.profileForm.get("avatar").value;
    if (handle.length == 0) {
      return;
    }
    if (this.avatarLink.length == 0) {
      this.avatarLink = "../../assets/img/avatar_placeholder.jpg";
    }
    const isRegistered = await this.registered
    if (!isRegistered) {
      try{
        await this.createProfile.mutate({username:handle}).toPromise()//.then(()=>{
        this.user.profile = {username: handle}
        console.log("user registered")
        this.setAndRoute()
      }catch(error){
        this.errorMessage = error + " Note: an error here might mean you are trying to register with a pre-existing / existing username "
      }
    } */
  };

  setAndRoute(){
    sessionStorage.setItem("userhash","123456789")//this.user.id)
    sessionStorage.setItem("username","LunaPunkLabs")//this.user.profile.username)
    sessionStorage.setItem("avatar","team Identity")//this.avatarLink)
    this.router.navigate(["profile/new"]);
  }


  /*private async isRegistered():Promise<boolean>{
    if(!this.user)
      this.user =  await this.getProfileData()
    if(this.user.profile)
      return this.user.profile.username != (null || undefined) ? true : false
    else 
      return false       
  }

  private getProfileData():Promise<Agent>{
    return this.myprofile.fetch().pipe(map(result=>{
        return <Agent>{id:result.data.me.id, profile:result.data.me.profile}
    })).toPromise().then((result)=> { return result},
      (reason)=>{ 
          this.errorMessage = reason
          return null
    }) as Promise<Agent> | null
  }

  unregister(){
    this.errorMessage = "unregister has not been implemented yet"  
  }*/
}
