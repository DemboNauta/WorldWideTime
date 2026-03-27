import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { Ciudad } from '../interfaces/ciudad';
import { TimeServiceService } from '../services/time-service.service';
import { AnalogClockComponent } from '../analog-clock/analog-clock.component';

@Component({
  selector: 'app-world-clock',
  standalone: true,
  imports: [AnalogClockComponent],
  templateUrl: './world-clock.component.html',
  styleUrl: './world-clock.component.css',
})
export class WorldClockComponent implements OnInit, OnDestroy {
  private intervalId?: ReturnType<typeof setInterval>;

  // ── State signals ────────────────────────────────────────────────────────────
  ciudades = signal<Ciudad[]>([
    { nombre: 'Nueva York',     timeZone: 'America/New_York',   emoji: '🗽', country: 'Estados Unidos',  descripcion: 'La ciudad que nunca duerme, hogar de la Estatua de la Libertad y Times Square.', timeDate: new Date() },
    { nombre: 'Madrid',         timeZone: 'Europe/Madrid',      emoji: '🇪🇸', country: 'España',           descripcion: 'La vibrante capital española, famosa por el Prado, la Puerta del Sol y su animada vida nocturna.', timeDate: new Date() },
    { nombre: 'Tokio',          timeZone: 'Asia/Tokyo',         emoji: '🗼', country: 'Japón',            descripcion: 'La megaciudad japonesa que fusiona tradición milenaria con tecnología de vanguardia.', timeDate: new Date() },
    { nombre: 'Londres',        timeZone: 'Europe/London',      emoji: '🎡', country: 'Reino Unido',      descripcion: 'Capital histórica con el Big Ben, el Támesis y una escena cultural sin igual.', timeDate: new Date() },
    { nombre: 'París',          timeZone: 'Europe/Paris',       emoji: '🗼', country: 'Francia',          descripcion: 'La Ciudad de la Luz, con la Torre Eiffel, el Louvre y una gastronomía exquisita.', timeDate: new Date() },
    { nombre: 'Berlín',         timeZone: 'Europe/Berlin',      emoji: '🇩🇪', country: 'Alemania',         descripcion: 'Capital histórica conocida por la Puerta de Brandeburgo y su rica escena cultural.', timeDate: new Date() },
    { nombre: 'Sídney',         timeZone: 'Australia/Sydney',   emoji: '🦘', country: 'Australia',        descripcion: 'Ciudad icónica con la Ópera y el Harbour Bridge frente al mar.', timeDate: new Date() },
    { nombre: 'Seúl',           timeZone: 'Asia/Seoul',         emoji: '🇰🇷', country: 'Corea del Sur',    descripcion: 'Metrópoli del K-pop, el gaming y los palacios históricos.', timeDate: new Date() },
    { nombre: 'Ciudad de México', timeZone: 'America/Mexico_City', emoji: '🌮', country: 'México',        descripcion: 'Capital rica en historia azteca, gastronomía y arquitectura colonial.', timeDate: new Date() },
    { nombre: 'São Paulo',      timeZone: 'America/Sao_Paulo',  emoji: '🇧🇷', country: 'Brasil',           descripcion: 'La ciudad más grande de América del Sur, centro cultural y económico.', timeDate: new Date() },
    { nombre: 'Bombay',         timeZone: 'Asia/Kolkata',       emoji: '🎬', country: 'India',            descripcion: 'Capital financiera de la India y cuna de Bollywood.', timeDate: new Date() },
    { nombre: 'Shanghái',       timeZone: 'Asia/Shanghai',      emoji: '🏙️', country: 'China',            descripcion: 'La joya económica de China, con el Bund y su impresionante horizonte moderno.', timeDate: new Date() },
    { nombre: 'Bangkok',        timeZone: 'Asia/Bangkok',       emoji: '🛕', country: 'Tailandia',        descripcion: 'Ciudad de los templos dorados, mercados flotantes y sabores únicos.', timeDate: new Date() },
    { nombre: 'Ho Chi Minh',    timeZone: 'Asia/Ho_Chi_Minh',  emoji: '🛵', country: 'Vietnam',          descripcion: 'Ciudad vibrante y en constante movimiento, con historia y mercados llenos de vida.', timeDate: new Date() },
    { nombre: 'Yakarta',        timeZone: 'Asia/Jakarta',       emoji: '🇮🇩', country: 'Indonesia',        descripcion: 'Megaciudad diversa y capital del archipiélago más grande del mundo.', timeDate: new Date() },
    { nombre: 'Dubái',          timeZone: 'Asia/Dubai',         emoji: '🏗️', country: 'Emiratos Árabes', descripcion: 'Ciudad futurista del desierto, famosa por sus rascacielos y lujo sin límites.', timeDate: new Date() },
    { nombre: 'Moscú',          timeZone: 'Europe/Moscow',      emoji: '🏰', country: 'Rusia',            descripcion: 'La histórica capital rusa con el Kremlin y la Plaza Roja.', timeDate: new Date() },
    { nombre: 'Toronto',        timeZone: 'America/Toronto',    emoji: '🍁', country: 'Canadá',           descripcion: 'Ciudad multicultural canadiense con la icónica CN Tower.', timeDate: new Date() },
    { nombre: 'Singapur',       timeZone: 'Asia/Singapore',     emoji: '🦁', country: 'Singapur',         descripcion: 'Ciudad-estado modelo de modernidad, limpieza y eficiencia asiática.', timeDate: new Date() },
    { nombre: 'Johannesburgo',  timeZone: 'Africa/Johannesburg',emoji: '🦁', country: 'Sudáfrica',        descripcion: 'La ciudad del oro, puerta de entrada a los safaris africanos.', timeDate: new Date() },
  ]);

  searchQuery     = signal('');
  use24h          = signal(true);
  sortBy          = signal<'name' | 'time'>('name');
  showFavorites   = signal(false);

  // ── Derived ─────────────────────────────────────────────────────────────────
  filteredCities = computed(() => {
    let list = this.ciudades();

    if (this.showFavorites()) {
      list = list.filter(c => c.favorita);
    }

    const q = this.searchQuery().trim().toLowerCase();
    if (q) {
      list = list.filter(c =>
        c.nombre.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.timeZone.toLowerCase().includes(q)
      );
    }

    return [...list].sort((a, b) => {
      if (this.sortBy() === 'time') {
        const toSecs = (d: Date) => d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
        return toSecs(a.timeDate) - toSecs(b.timeDate);
      }
      return a.nombre.localeCompare(b.nombre, 'es');
    });
  });

  favoritesCount = computed(() => this.ciudades().filter(c => c.favorita).length);
  dayCount       = computed(() => this.ciudades().filter(c => !c.noche).length);
  nightCount     = computed(() => this.ciudades().filter(c =>  c.noche).length);

  constructor(private timeService: TimeServiceService) {}

  // ── Lifecycle ────────────────────────────────────────────────────────────────
  ngOnInit(): void {
    for (const ciudad of this.ciudades()) {
      this.timeService.getTime(ciudad.timeZone).subscribe(time => {
        this.ciudades.update(cs =>
          cs.map(c =>
            c.timeZone === ciudad.timeZone
              ? { ...c, timeDate: new Date(time.dateTime), noche: this.isNight(new Date(time.dateTime)) }
              : c
          )
        );
      });
    }

    this.intervalId = setInterval(() => {
      this.ciudades.update(cs =>
        cs.map(c => {
          const next = new Date(c.timeDate.getTime() + 1000);
          return { ...c, timeDate: next, noche: this.isNight(next) };
        })
      );
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────
  isNight(d: Date): boolean {
    const h = d.getHours();
    return h >= 22 || h < 6;
  }

  formatTime(d: Date): string {
    if (this.use24h()) {
      return d.toTimeString().split(' ')[0];
    }
    const h = d.getHours();
    const m = d.getMinutes().toString().padStart(2, '0');
    const s = d.getSeconds().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    return `${((h % 12) || 12).toString().padStart(2, '0')}:${m}:${s} ${ampm}`;
  }

  formatDate(d: Date): string {
    return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' });
  }

  getUtcOffset(timeZone: string, d: Date): string {
    try {
      const parts = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'shortOffset' })
        .formatToParts(d);
      return parts.find(p => p.type === 'timeZoneName')?.value ?? 'UTC';
    } catch {
      return 'UTC';
    }
  }

  toggleFavorite(ciudad: Ciudad): void {
    this.ciudades.update(cs =>
      cs.map(c => c.timeZone === ciudad.timeZone ? { ...c, favorita: !c.favorita } : c)
    );
  }

  onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  onSortChange(event: Event): void {
    this.sortBy.set((event.target as HTMLSelectElement).value as 'name' | 'time');
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }
}
