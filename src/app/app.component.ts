import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//SERVICES
import { SpinnerService } from './services/spinner-service/spinner.service';

//COMPONENTS
import { OverlaySpinnerComponent } from './components/overlay-spinner/overlay-spinner.component';
import { MainNavbarComponent } from './components/main-navbar/main-navbar.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,

    //COMPONENTS
    OverlaySpinnerComponent,
    MainNavbarComponent,
    MainFooterComponent,
    MainMenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'currency-kingdom';

  constructor(
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    //SPINNER START
    this.spinnerService.stopLoading();
  }
}
