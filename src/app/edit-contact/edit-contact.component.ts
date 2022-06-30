//import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mycontact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  public loading: boolean = false;
  public contactId: string | null = null;
  public contact: Mycontact = {} as Mycontact;
  public errorMessage: string | null = null;
  public grp: MyGroup[] = [] as MyGroup[];

  constructor(private activatedRoute: ActivatedRoute, private cantService: ContactService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId')
    });
    if (this.contactId) {
      this.cantService.getContacts(this.contactId).subscribe((data: Mycontact) => {
        this.contact = data;
        this.loading = false;
        this.cantService.getAllGroups().subscribe((data: MyGroup[]) => {
          this.grp = data;

        })
      }, (error) => {
        this.errorMessage = error;
        this.loading = false;
      })

    }

  }
  public submitUpdate() {
    if (this.contactId) {
      this.cantService.updateContacts(this.contact, this.contactId).subscribe((data:Mycontact) => {
        this.router.navigate(['/']).then();
      }, (error) => {
        this.router.navigate([`/contact/edit/${this.contact}`]).then()
      })
    }
  }
}