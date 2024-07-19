import { Component, inject } from '@angular/core';
import { ConfigurationDataService } from '../services/configuration-data.service';

@Component({
  selector: 'app-home-configuration',
  templateUrl: './home-configuration.component.html',
  styleUrls: ['./home-configuration.component.scss'],
})
export class HomeConfigurationComponent {
  configDataService = inject(ConfigurationDataService);
}
