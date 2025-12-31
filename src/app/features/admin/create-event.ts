import { Component, signal } from '@angular/core';
import { debounce, disabled, Field, form, minLength, required } from '@angular/forms/signals';
import { DevFestEvent } from '../../models/event.model';

interface CreateEventForm extends Omit<DevFestEvent, 'id'> {}

@Component({
    selector: 'app-create-event',
    imports: [Field],
    template: `
        <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
            <h2 class="text-2xl font-bold mb-6 text-gray-800">Create New Event</h2>

            <!-- TODO Mod 4: Bind [group] -->
            <form (submit)="onSubmit($event)" class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                    <input
                        [field]="form.title"
                        type="text"
                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="e.g. Angular Workshop"
                    />
                    @if (form.title().touched() && form.title().invalid()) {
                        <p class="text-red-500 text-sm mt-1">
                            {{ form.title().errors()[0].message }}
                        </p>
                    }
                </div>

                <!-- Description -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        [field]="form.description"
                        rows="3"
                        class="w-full px-4 py-2 border rounded-md outline-none"
                    ></textarea>

                    @if (form.description().touched() && form.description().invalid()) {
                        <p class="text-red-500 text-sm mt-1">
                            {{ form.description().errors()[0].message }}
                        </p>
                    }
                </div>

                <!-- Date & Location -->
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label>Date</label>
                        <input
                            [field]="form.date"
                            type="datetime-local"
                            class="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label>Location</label>
                        <input
                            [field]="form.location"
                            type="text"
                            class="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                </div>

                <!-- TODO Mod 4: Dynamic Speaker Array -->

                <div class="flex justify-end gap-4 pt-4">
                    <button type="button" class="px-4 py-2 text-gray-600 hover:text-gray-800">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        [disabled]="form().invalid()"
                        class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        Create Event
                    </button>
                </div>
            </form>
        </div>
    `,
})
export class CreateEvent {
    readonly eventData = signal<CreateEventForm>({
        title: '',
        description: '',
        date: new Date().toISOString().slice(0, 16),
        location: '',
        speakers: [],
        image: '/image/event4.png',
    });

    readonly form = form(this.eventData, (root) => {
        // Title Rules
        required(root.title, { message: 'Title is required' });

        // Description Rules
        // A. Debounce: Wait 1000ms after typing stops before updating the model
        debounce(root.description, 1000);
        // B. Conditional Disable: Disable description if Title is empty
        disabled(root.description, ({ valueOf }) => !valueOf(root.title));
        // C. Validation
        required(root.description, { message: 'Description is required' });
        minLength(root.description, 10, { message: 'Description must be at least 10 chars' });

        // Other Rules
        required(root.date, { message: 'Date is required' });
        required(root.location, { message: 'Location is required' });
    });


    public onSubmit(form: SubmitEvent) {

    }
}
