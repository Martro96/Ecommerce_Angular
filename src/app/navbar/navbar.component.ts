import { Component, EventEmitter, Output } from '@angular/core'; //Añado EventEmitter y Output para poder utilizar el método changeView

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() viewChange = new EventEmitter<string>(); // Evento para comunicarnos con el padre

  // Método para emitir el cambio de vista
  changeView(view: string) {
    this.viewChange.emit(view);
  }
}
