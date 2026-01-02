import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TICKETS_URL } from './tokens';
import { TicketEntry } from '../models/ticket-entry.model';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private readonly http = inject(HttpClient);
    private ticketsUrl = inject(TICKETS_URL);

    private ticketIds = signal<string[]>([]);

    readonly count = computed(() => this.ticketIds().length);

    constructor() {
        this.loadTickets();
    }

    public addTicket(eventId: string) {
        const previousIds = this.ticketIds();
        this.ticketIds.update(ids => [...ids, eventId]);
        this.http.post(this.ticketsUrl + 'dd', {eventId}).subscribe({
            next: () => console.log('Optimistic update successful'),
            error: err => {
                console.error(err);
                this.ticketIds.set(previousIds);
            }
        });

    }

    private loadTickets(): void {
        this.http.get<TicketEntry[]>(this.ticketsUrl).subscribe({
            next: data => {
                const ids = data.map(t => t.id);
                this.ticketIds.set(ids);
            }
        });
    }
}
