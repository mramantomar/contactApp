import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mycontact } from "../models/myContact";
import { MyGroup } from "../models/myGroup";
import { ContactService } from '../services/contact.service';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public contactId: string | null = null;
  public loading: boolean = false
  public contact: Mycontact = {} as Mycontact;
  public errorMessage: string | null = null;
  public groups:MyGroup[] =[] as MyGroup[] ;

  constructor(private cantService:ContactService,private router:Router) { }

  ngOnInit(): void {
    this.cantService.getAllGroups().subscribe((data:MyGroup[])=>{
      this.groups=data;
     // this.loading=false;
    }, (error) => {
      this.errorMessage = error;
      //this.loading = false;
    })
  }
public addSubmit(){
  this.cantService.CreateContacts(this.contact).subscribe((data:Mycontact)=>{

    this.router.navigate(['/']).then();
  },(error) =>{
    this.router.navigate(['/contact/add']).then()
  }
  )
}
}
