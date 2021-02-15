import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html'
})
export class CalendarEventComponent {
  public calendarEvents: CalendarEvent[];
  currentEvent: CalendarEvent;
  isEditMode: boolean;

  impOptions:any[] = [
    {
      value:true,
      name:"Yes"
    },
    {
      value:false,
      name:"No"
    }
  ]
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.refreshTable();
  }

  private refreshTable() {
    this.http.get<CalendarEvent[]>(this.baseUrl + 'api/calendarevent').subscribe(result => {
      this.calendarEvents = result;
    }, error => console.error(error));
  }

  formatDate(date){
    return date.split('T')[0];
  }

  formatImportant(isImportant){
    return isImportant ? "Yes" : "No";
  }

  editEvent(calendarEvent){
    if (this.isEditMode){
      this.isEditMode = false;
      this.currentEvent = null;
    }else{
      this.isEditMode = true;
      this.currentEvent = {...calendarEvent};
    }
  }

  ok(currentEvent){
    if (currentEvent){
      currentEvent.isImportant = currentEvent.isImportant === "true";
      this.http.put<CalendarEvent[]>(this.baseUrl + 'api/calendarevent/' + currentEvent.id, currentEvent).subscribe(result => {
        
        if (result){
          this.refreshTable();
          alert('success');
        }
      }, error => console.error(error));
    }
  }

  cancel(){
    this.isEditMode = false;
    this.currentEvent = null;
  }
}

interface CalendarEvent {
  name: string;
  isImportant: boolean;
  date: Date;
}
