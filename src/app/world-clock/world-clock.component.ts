import { Component, OnInit } from '@angular/core';
import { Ciudad } from '../interfaces/ciudad';
import { TimeServiceService } from '../services/time-service.service';

@Component({
  selector: 'app-world-clock',
  standalone: true,
  imports: [],
  templateUrl: './world-clock.component.html',
  styleUrl: './world-clock.component.css'
})
export class WorldClockComponent implements OnInit {
  ciudades: Ciudad[] = [
    {nombre: 'New York', timeZone: 'America/New_York', descripcion: 'La ciudad que nunca duerme, conocida por su icónica Estatua de la Libertad y Times Square.'},
    {nombre: 'Madrid', timeZone: 'Europe/Madrid', descripcion: 'La vibrante capital de España, famosa por su arquitectura, museos y vida nocturna.'},
    {nombre: 'Tokyo', timeZone: 'Asia/Tokyo', descripcion: 'La capital de Japón, conocida por su tecnología avanzada y su mezcla de tradición y modernidad.'},
    {nombre: 'London', timeZone: 'Europe/London', descripcion: 'La histórica capital del Reino Unido, famosa por el Big Ben, el Museo Británico y el London Eye.'},
    {nombre: 'Paris', timeZone: 'Europe/Paris', descripcion: 'La ciudad del amor y la luz, famosa por la Torre Eiffel, el Louvre y su exquisita gastronomía.'},
    {nombre: 'Berlin', timeZone: 'Europe/Berlin', descripcion: 'La capital de Alemania, conocida por su rica historia, la Puerta de Brandeburgo y su vibrante escena cultural.'},
    {nombre: 'Sydney', timeZone: 'Australia/Sydney', descripcion: 'La icónica ciudad australiana, famosa por su Ópera, el Harbour Bridge y sus hermosas playas.'},
    {nombre: 'Seoul', timeZone: 'Asia/Seoul', descripcion: 'La capital de Corea del Sur, conocida por su tecnología avanzada, palacios históricos y cultura pop.'},
    {nombre: 'Mexico City', timeZone: 'America/Mexico_City', descripcion: 'La vibrante capital de México, rica en historia, cultura y una mezcla de arquitectura antigua y moderna.'},
    {nombre: 'Sao Paulo', timeZone: 'America/Sao_Paulo', descripcion: 'La ciudad más grande de Brasil, conocida por su diversidad cultural, gastronomía y vida nocturna.'},
    {nombre: 'Mumbai', timeZone: 'Asia/Kolkata', descripcion: 'La capital financiera de la India, famosa por Bollywood, su vibrante vida urbana y su puerto histórico.'},
    {nombre: 'Shanghai', timeZone: 'Asia/Shanghai', descripcion: 'La metrópoli china conocida por su horizonte moderno, el Bund y su importancia en el comercio global.'},
    {nombre: 'Bangkok', timeZone: 'Asia/Bangkok', descripcion: 'La animada capital de Tailandia, famosa por sus templos, mercados y vibrante vida nocturna.'},
    {nombre: 'Ho Chi Minh City', timeZone: 'Asia/Ho_Chi_Minh', descripcion: 'La bulliciosa ciudad vietnamita, conocida por su historia, mercados y vibrante vida urbana.'},
    {nombre: 'Jakarta', timeZone: 'Asia/Jakarta', descripcion: 'La capital de Indonesia, conocida por su vida vibrante, cultura diversa y crecimiento económico.'},
];


  constructor(private timeService: TimeServiceService) { }

  ngOnInit(): void {
    for(let ciudad of this.ciudades) {
      this.timeService.getTime(ciudad.timeZone).subscribe((time)=>{
        ciudad.time = new Date(time.dateTime).toTimeString().split(' ')[0];
        ciudad.noche = new Date(time.dateTime).getHours() >= 22 || new Date(time.dateTime).getHours() <= 8;
      });
    }
    setInterval(() => {
      for(let ciudad of this.ciudades) {
        this.timeService.getTime(ciudad.timeZone).subscribe((time)=>{
          ciudad.time = new Date(time.dateTime).toTimeString().split(' ')[0];
          ciudad.noche = new Date(time.dateTime).getHours() >= 22 || new Date(time.dateTime).getHours() <= 8;
          console.log(ciudad)
        });
      }
    }, 1000);
  }
}
