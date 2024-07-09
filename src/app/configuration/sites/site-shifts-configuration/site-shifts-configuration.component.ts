import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-shifts-configuration',
  templateUrl: './site-shifts-configuration.component.html',
  styleUrls: ['./site-shifts-configuration.component.scss'],
})
export class SiteShiftsConfigurationComponent implements OnInit {
  checked: any;
  ngOnInit(): void {
    this.updateShifts();
  }

  shiftOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
  ];
  selectedShift = 1;
  shifts: any[] = [];

  // Function to initialize shifts based on selected shift count
  updateShifts() {
    const requiredShifts = this.selectedShift;

    if (this.shifts.length > requiredShifts) {
      this.shifts.length = requiredShifts;
    } else if (this.shifts.length < requiredShifts) {
      for (let i = this.shifts.length; i < requiredShifts; i++) {
        this.shifts.push({
          shiftStartTime: '08:00',
          shiftEndTime: '16:00',
        });
      }
    }
  }

  // Function to handle input focus
  onInputFocus(event: Event) {
    const inputContainer = (event.target as HTMLElement).closest(
      '.input-container'
    );
    if (inputContainer) {
      inputContainer.classList.add('highlight');
      const icons = inputContainer.querySelectorAll('.input-icon i');
      icons.forEach(icon => {
        icon.classList.toggle('fa-clock', false);
        icon.classList.toggle('fa-circle', true);
      });
    }
  }

  // Function to handle input blur
  onInputBlur(event: Event) {
    const inputContainer = (event.target as HTMLElement).closest(
      '.input-container'
    );
    if (inputContainer) {
      inputContainer.classList.remove('highlight');
      const icons = inputContainer.querySelectorAll('.input-icon i');
      icons.forEach(icon => {
        icon.classList.toggle('fa-clock', true);
        icon.classList.toggle('fa-circle', false);
      });
    }
  }
}
