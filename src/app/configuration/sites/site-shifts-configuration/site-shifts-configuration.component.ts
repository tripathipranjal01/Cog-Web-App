import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationService } from '../../services';
import { SHIFT_OPTIONS } from '../../constants';
import { ToastService } from 'src/app/core/services/toast.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-site-shifts-configuration',
  templateUrl: './site-shifts-configuration.component.html',
  styleUrls: ['./site-shifts-configuration.component.scss'],
})
export class SiteShiftsConfigurationComponent implements OnInit {
  @Output() backTab = new EventEmitter<void>();
  @Output() saveTab = new EventEmitter<void>();

  checked: any;
  selectedShift = 0;
  shifts: any[] = [];
  siteId: string | null = null;

  shiftOptions = SHIFT_OPTIONS;

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigurationService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.siteId = params.get('id') || null;
      if (this.siteId) {
        this.loadShifts(this.siteId);
      }
    });
  }

  loadShifts(siteId: string): void {
    this.configService.getAllShifts(siteId).subscribe(
      (shifts: any[]) => {
        this.shifts = shifts.map(shift => ({
          id: shift.id,
          startTime: this.formatTime(shift.startTime),
          endTime: this.formatTime(shift.endTime),
          sequence: shift.sequence,
          siteId: shift.siteId,
        }));
        this.selectedShift = this.shifts.length > 0 ? this.shifts.length : 0;
      },
      error => {
        console.error('Failed to fetch shifts:', error);
        this.toastService.showToastMessage(
          'Error',
          'Failed to load shifts',
          'error'
        );
      }
    );
  }

  updateShifts(): void {
    const requiredShifts = this.selectedShift;

    if (this.shifts.length > requiredShifts) {
      this.shifts.length = requiredShifts;
    } else if (this.shifts.length < requiredShifts) {
      for (let i = this.shifts.length; i < requiredShifts; i++) {
        this.shifts.push({
          startTime: '',
          endTime: '',
          sequence: i + 1,
          siteId: this.siteId,
        });
      }
    }
  }

  deleteShift(shiftId: any, index: number): void {
    if (shiftId) {
      this.configService.deleteShift(shiftId).subscribe(
        () => {
          this.shifts.splice(index, 1);
          this.selectedShift = this.shifts.length;
          this.toastService.showToastMessage(
            'Success',
            'Shift successfully deleted',
            'success'
          );
        },
        error => {
          console.error('Failed to delete shift:', error);
          this.toastService.showToastMessage(
            'Error',
            'Failed to delete shift',
            'error'
          );
        }
      );
    } else {
      this.shifts.splice(index, 1);
      this.selectedShift = this.shifts.length;
      this.toastService.showToastMessage(
        'Success',
        'Shift successfully deleted',
        'success'
      );
    }
  }

  onBack(): void {
    this.backTab.emit();
  }

  onNext(): void {
    const formattedShifts = this.shifts.map(shift => ({
      ...shift,
      startTime: this.formatTime(shift.startTime),
      endTime: this.formatTime(shift.endTime),
    }));

    formattedShifts.forEach(shift => {
      if (shift.id) {
        this.configService.updateShift(shift.id, shift).subscribe(
          (updatedShift: any) => {
            console.log('Shift updated:', updatedShift);
          },
          error => {
            console.error('Error updating shift:', error);
            this.toastService.showToastMessage(
              'Error',
              'Error updating shift',
              'error'
            );
          }
        );
      } else {
        this.configService.createShift(shift).subscribe(
          (newShift: any) => {
            console.log('New shift created:', newShift);
          },
          error => {
            console.error('Error creating shift:', error);
            this.toastService.showToastMessage(
              'Error',
              'Error creating shift',
              'error'
            );
          }
        );
      }
    });
  }

  private formatTime(date: Date | string): string {
    if (!date) {
      return '';
    }
    return DateTime.fromISO(date.toString()).toFormat('HH:mm:ss');
  }
}
