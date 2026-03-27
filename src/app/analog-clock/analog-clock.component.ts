import { Component, input, computed } from '@angular/core';

interface Point { x: number; y: number; }

@Component({
  selector: 'app-analog-clock',
  standalone: true,
  template: `
    <svg viewBox="0 0 100 100" class="w-full h-full" aria-hidden="true">

      <!-- Outer ring -->
      <circle cx="50" cy="50" r="48"
        fill="rgba(0,0,0,0.25)"
        stroke="rgba(255,255,255,0.15)"
        stroke-width="1.5"/>

      <!-- Hour markers -->
      @for (m of hourMarkers; track $index) {
        <line
          [attr.x1]="m.x1" [attr.y1]="m.y1"
          [attr.x2]="m.x2" [attr.y2]="m.y2"
          stroke="rgba(255,255,255,0.5)"
          [attr.stroke-width]="m.major ? 2.5 : 1"
          stroke-linecap="round"/>
      }

      <!-- Hour hand -->
      <line x1="50" y1="50"
            [attr.x2]="hourEnd().x" [attr.y2]="hourEnd().y"
            stroke="white" stroke-width="4"
            stroke-linecap="round"
            opacity="0.95"/>

      <!-- Minute hand -->
      <line x1="50" y1="50"
            [attr.x2]="minuteEnd().x" [attr.y2]="minuteEnd().y"
            stroke="rgba(255,255,255,0.85)" stroke-width="2.5"
            stroke-linecap="round"/>

      <!-- Second hand -->
      <line x1="50" y1="50"
            [attr.x2]="secondEnd().x" [attr.y2]="secondEnd().y"
            stroke="#fb7185" stroke-width="1.5"
            stroke-linecap="round"/>

      <!-- Center cap -->
      <circle cx="50" cy="50" r="3.5" fill="white"/>
      <circle cx="50" cy="50" r="1.5" fill="#fb7185"/>
    </svg>
  `
})
export class AnalogClockComponent {
  date = input.required<Date>();

  /** Pre-computed static hour markers (inner/outer endpoints for 12 ticks) */
  readonly hourMarkers = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
    const major = i % 3 === 0;
    const r1 = major ? 38 : 41;
    const r2 = 47;
    return {
      x1: +(50 + r1 * Math.cos(angle)).toFixed(2),
      y1: +(50 + r1 * Math.sin(angle)).toFixed(2),
      x2: +(50 + r2 * Math.cos(angle)).toFixed(2),
      y2: +(50 + r2 * Math.sin(angle)).toFixed(2),
      major,
    };
  });

  private point(angleDeg: number, radius: number): Point {
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return {
      x: +(50 + radius * Math.cos(rad)).toFixed(2),
      y: +(50 + radius * Math.sin(rad)).toFixed(2),
    };
  }

  hourEnd = computed<Point>(() => {
    const d = this.date();
    const deg = (d.getHours() % 12) * 30 + d.getMinutes() * 0.5;
    return this.point(deg, 28);
  });

  minuteEnd = computed<Point>(() => {
    const d = this.date();
    const deg = d.getMinutes() * 6 + d.getSeconds() * 0.1;
    return this.point(deg, 37);
  });

  secondEnd = computed<Point>(() => {
    const d = this.date();
    const deg = d.getSeconds() * 6;
    return this.point(deg, 43);
  });
}
