import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Mycontact } from '../models/myContact';
import { ContactService } from '../services/contact.service';
import db from "../../../server/db.json";
@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {
  public loading: boolean = false;
  public contact: Mycontact[] = [];
  public errorMessage: string | null = null;

  constructor(private cantService: ContactService) {

  }

  ngOnInit(): void {
    this.loading = true;
  this.cantService.getAllContacts().subscribe((data: Mycontact[]) => {
      this.contact = data;
      this.loading = false;
    }, (error) => {
      this.errorMessage = error;
      this.loading = false;

    }
    )


  }
  deleteContact(contactId:string | undefined){
    if(contactId){
      this.cantService.deleteContacts(contactId).subscribe((data:{})=>{
        this.ngOnInit();
      },(error)=>{
        this.errorMessage=error;
        this.loading= false;
      })
    }
  }

}
