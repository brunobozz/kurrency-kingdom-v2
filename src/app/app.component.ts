import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';

//SERVICES
import { SpinnerService } from './services/spinner-service/spinner.service';

//COMPONENTS
import { OverlaySpinnerComponent } from './components/overlay-spinner/overlay-spinner.component';
import { MainNavbarComponent } from './components/main-navbar/main-navbar.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { filter, map, Observable, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
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

  // observables para controlar exibição
  showHeader$!: Observable<boolean>;
  showFooter$!: Observable<boolean>;

  constructor(
    private spinnerService: SpinnerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // SPINNER START
    this.spinnerService.stopLoading();

    // observa a rota ativa e lê os 'data'
    const routeData$ = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => {
        let r = this.route;
        while (r.firstChild) r = r.firstChild;
        return r.snapshot.data || {};
      }),
      startWith({})
    );

    // se não tiver data definido, ESCONDE (false)
    this.showHeader$ = routeData$.pipe(map((d: any) => d['showHeader'] ?? false));
    this.showFooter$ = routeData$.pipe(map((d: any) => d['showFooter'] ?? false));
  }
}
