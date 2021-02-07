import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.component.html'
})
export class CalendarEventComponent {
  public calendarEvents: CalendarEvent[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<CalendarEvent[]>(baseUrl + 'api/calendarevent').subscribe(result => {
      this.calendarEvents = result;
    }, error => console.error(error));
  }
}

interface CalendarEvent {
  name: string;
  isImportant: boolean;
}
