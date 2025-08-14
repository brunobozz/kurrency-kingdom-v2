import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../../services/spinner-service/spinner.service';

@Component({
  selector: 'app-overlay-spinner',
  standalone: true,
  imports: [],
  templateUrl: './overlay-spinner.component.html',
  styleUrl: './overlay-spinner.component.scss',
})
export class OverlaySpinnerComponent implements AfterViewInit, OnDestroy {
  loadingSubscription: Subscription = new Subscription();

  constructor(
    private loadingScreenService: SpinnerService,
    private _elmRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this._elmRef.nativeElement.style.display = 'none';
    this.loadingSubscription = this.loadingScreenService.loading$
      .pipe()
      .subscribe((status: boolean) => {
        this._elmRef.nativeElement.style.display = status ? 'block' : 'none';
        this._changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
