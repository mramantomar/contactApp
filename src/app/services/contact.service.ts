import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Mycontact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl: string = "http://localhost:4000";

  constructor(private http: HttpClient) { }
  //Get All contact data
  public getAllContacts(): Observable<Mycontact[]> {
    let dataUrl: string = `${this.baseUrl}/contacts`; 
    return this.http.get<Mycontact[]>(dataUrl).pipe(catchError(this.handleError))
  }
  //get single contact
  public getContacts(contactId: string): Observable<Mycontact> {
    let dataUrl: string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.get<Mycontact>(dataUrl).pipe(catchError(this.handleError))
  }

  //create contact
  public CreateContacts(contact: Mycontact): Observable<Mycontact> {
    let dataUrl: string = `${this.baseUrl}/contacts`;
    return this.http.post<Mycontact>(dataUrl,contact).pipe(catchError(this.handleError))
  }
  //update contact
  public updateContacts(contact: Mycontact, contactId: string): Observable<Mycontact> {
    let dataUrl: string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.put<Mycontact>(dataUrl,contact).pipe(catchError(this.handleError))
  }
  //delete contact
  public deleteContacts(contactId: string): Observable<Mycontact> {
    let dataUrl: string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.delete<Mycontact>(dataUrl).pipe(catchError(this.handleError))
  }
  //get all groups
  public getAllGroups(): Observable<MyGroup[]> {
    let dataUrl: string = `${this.baseUrl}/groups`;
    return this.http.get<MyGroup[]>(dataUrl).pipe(catchError(this.handleError))
  }

  //get single group
  public getGroup(contact: Mycontact): Observable<MyGroup> {
    let dataUrl: string = `${this.baseUrl}/groups/${contact.groupId}`;
    return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError))
  }


  //error solve

  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = ''
    if (error.error instanceof ErrorEvent) {
      //client error
      errorMessage = `Error:${error.error.message}`;
    }
    else {
      //server side error
      errorMessage = `Status:${error.status} \n Message:${error.message}`;
    }
    return throwError(errorMessage);
  }
}
