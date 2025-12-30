import { inject, Injectable, Signal } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { DevFestEvent } from '../models/event.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EventsService {
    private apiUrl = 'http://localhost:3000/events';

    private readonly http = inject(HttpClient);

    public getEventsResource(query: Signal<string>) {
        return httpResource<DevFestEvent[]>(() => {
            const q = query();
            return q ? `${this.apiUrl}?q=${q}` : this.apiUrl;
        });
    }

    public deleteEvent(eventId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${eventId}`);
    }
}
