import { Component, computed, input, linkedSignal, output } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UiCard } from '../../shared/ui-card';

@Component({
    selector: 'app-event-card',
    imports: [DatePipe, RouterLink, NgOptimizedImage, UiCard],
    template: `
        <app-ui-card>
            <div card-header class="relative h-48 w-full bg-gray-200">
                <img
                    [ngSrc]="image()"
                    width="500"
                    height="200"
                    priority
                    class="object-cover w-full h-full max-h-full max-w-full"
                    alt="Event thumbnail"
                />
            </div>

            <div class="p-6">
                <div class="flex justify-between items-center mt-4">
                    <p class="text-sm text-blue-600 font-semibold mb-2">
                        {{ (date() | date: 'mediumDate') || 'TBA' }}
                    </p>

                    @let days = daysUntil();
                    @if (days != null) {
                        <div
                            class="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm"
                        >
                            @if (days > 0) {
                                In {{ days }} Days
                            } @else if (days < 0) {
                                Past Event
                            } @else {
                                Happening Now!
                            }
                        </div>
                    }
                </div>

                <h3 class="text-xl font-bold text-gray-800 my-2">{{ title() }}</h3>

                <div class="flex justify-between items-center mt-4">
                    <button
                        class="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                        [class.text-red-500]="isFavorite()"
                        (click)="toggleFavorite()"
                    >
                        {{ isFavorite() ? '❤' : '♡' }} Like
                    </button>

                    <button
                        class="text-gray-400 text-sm hover:text-gray-600 cursor-pointer"
                        (click)="removeEvent()"
                    >
                        Remove
                    </button>
                </div>
            </div>
            <div card-footer class="mt-4 text-right">
                <a
                    [routerLink]="['/event', id()]"
                    class="text-blue-600 font-medium hover:underline cursor-pointer"
                >
                    View Details →
                </a>
            </div>
        </app-ui-card>
    `,
})
export class EventCard {
    id = input.required<string>();
    title = input.required<string>();
    image = input.required<string>();
    date = input<string>();
    initialLike = input(false);

    delete = output();

    isFavorite = linkedSignal(() => this.initialLike());

    daysUntil = computed(() => {
        const eventDate = this.date();

        if (!eventDate) {
            return null;
        }

        const today = new Date();
        const target = new Date(eventDate);

        const diffTime = target.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    });

    toggleFavorite(): void {
        this.isFavorite.update((val) => !val);
    }

    removeEvent(): void {
        this.delete.emit();
    }
}
