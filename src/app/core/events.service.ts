import { inject, Injectable, Signal } from '@angular/core';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { DevFestEvent } from '../models/event.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EventsService {
    private apiUrl = 'http://localhost:3000/events';

    private readonly http = inject(HttpClient);

    public getEventsResource(query: Signal<string>): HttpResourceRef<DevFestEvent[] | undefined> {
        return httpResource<DevFestEvent[]>(() => {
            const q = query();
            return q ? `${this.apiUrl}?q=${q}` : this.apiUrl;
        });
    }

    public getEventResource(id: Signal<string>): HttpResourceRef<DevFestEvent | undefined> {
        return httpResource<DevFestEvent>(() => `${this.apiUrl}/${id()}`);
    }

    public deleteEvent(eventId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${eventId}`);
    }

    public createEvent(event: Omit<DevFestEvent, 'id'>): Observable<DevFestEvent> {
        return this.http.post<DevFestEvent>(this.apiUrl, event);
    }
}
