import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-header',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './feature-header.component.html',
  styleUrl: './feature-header.component.scss'
})
export class FeatureHeaderComponent {
  @Input() title: string = "";
  @Input() icon: string = "mdi-circle";
}
