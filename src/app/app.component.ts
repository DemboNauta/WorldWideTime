import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorldClockComponent } from './world-clock/world-clock.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorldClockComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'worldWideDate';
}
