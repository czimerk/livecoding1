import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Guid } from 'guid-typescript';
@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html'
})
export class CalendarEventComponent {
  public calendarEvents: CalendarEvent[];
  currentEvent: CalendarEvent;
  isEditMode: boolean;
  isAddMode: boolean;

  impOptions: any[] = [
    {
      value: true,
      name: "Yes"
    },
    {
      value: false,
      name: "No"
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

  formatDate(date) {
    return date.split('T')[0];
  }

  formatImportant(isImportant) {
    return isImportant ? "Yes" : "No";
  }

  editEvent(calendarEvent) {
    this.isAddMode = false;
    if (this.isEditMode && calendarEvent.id === this.currentEvent.id) {
      this.isEditMode = false;
      this.currentEvent = null;
    } else {
      this.isEditMode = true;
      this.currentEvent = { ...calendarEvent };
    }
  }

  addEvent(calendarEvent) {
    this.isEditMode = false;
    if (this.isAddMode) {
      this.isAddMode = false;
      this.currentEvent = null;
    } else {
      this.isAddMode = true;
      this.currentEvent = {
        id: "",
        name: "",
        isImportant: false,
        date: new Date()
      };
    }
  }

  ok(currentEvent) {
    if (currentEvent) {
      if (this.isEditMode) {
        currentEvent.isImportant = currentEvent.isImportant === "true";
        this.http.put<CalendarEvent[]>(this.baseUrl + 'api/calendarevent/' + currentEvent.id, currentEvent).subscribe(result => {
          if (result) {
            this.refreshTable();
            alert('success edit');
          }
        }, error => console.error(error));
      } else {
        currentEvent.isImportant = currentEvent.isImportant === "true" || currentEvent.isImportant === true;
        currentEvent.id = Guid.create().toString();
        this.http.post<CalendarEvent[]>(this.baseUrl + 'api/calendarevent', currentEvent).subscribe(result => {
          if (result) {
            this.refreshTable();
            alert('success add');
          }
        }, error => console.error(error));
      }

    }
  }

  cancel() {
    this.isEditMode = false;
    this.currentEvent = null;
  }

  delete(calendarEvent) {
    if (confirm('Are you sure you want to delete ' + calendarEvent.name + '?')) {
      this.http.delete<CalendarEvent[]>(this.baseUrl + 'api/calendarevent/' + calendarEvent.id).subscribe(result => {

        if (result) {
          this.refreshTable();
          alert('success');
        }
      }, error => console.error(error));
    }

  }
}

interface CalendarEvent {
  id: string;
  name: string;
  isImportant: boolean;
  date: Date;
}
