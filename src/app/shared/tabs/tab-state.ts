import { Injectable, signal } from '@angular/core';

@Injectable()
export class TabState {
    readonly activeTab = signal<string>('');

    public activate(label: string): void {
        this.activeTab.set(label);
    }
}