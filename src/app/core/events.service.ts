import { inject, Injectable, Signal } from '@angular/core';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { DevFestEvent } from '../models/event.model';
import { Observable } from 'rxjs';
import { API_URL } from './tokens';

@Injectable({
    providedIn: 'root',
})
export class EventsService {
    private url = inject(API_URL);
    private apiUrl = `${this.url}/events`;

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
