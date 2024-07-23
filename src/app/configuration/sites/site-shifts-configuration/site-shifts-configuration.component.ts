import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationService } from '../../services';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-site-shifts-configuration',
  templateUrl: './site-shifts-configuration.component.html',
  styleUrls: ['./site-shifts-configuration.component.scss'],
  providers: [DatePipe],
})
export class SiteShiftsConfigurationComponent implements OnInit {
  @Output() backTab = new EventEmitter<void>();
  @Output() saveTab = new EventEmitter<void>();

  checked: any;
  selectedShift = 0;
  shifts: any[] = [];
  siteId: string | null = null;

  shiftOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
  ];

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigurationService,
    private messageService: MessageService,
    private datePipe: DatePipe
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
        if (this.shifts.length > 0) {
          this.selectedShift = this.shifts.length;
        } else {
          this.selectedShift = 0;
        }
      },
      error => {
        console.error('Failed to fetch shifts:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load shifts',
        });
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
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Shift successfully deleted',
          });
        },
        error => {
          console.error('Failed to delete shift:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete shift',
          });
        }
      );
    } else {
      this.shifts.splice(index, 1);
      this.selectedShift = this.shifts.length;
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Shift successfully deleted',
      });
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
          (error: any) => {
            console.error('Error updating shift:', error);
          }
        );
      } else {
        this.configService.createShift(shift).subscribe(
          (newShift: any) => {
            console.log('New shift created:', newShift);
          },
          (error: any) => {
            console.error('Error creating shift:', error);
          }
        );
      }
    });
  }

  private formatTime(date: Date | string): string {
    if (!date) {
      return '';
    }
    const parsedDate = new Date(date);
    return this.datePipe.transform(parsedDate, 'HH:mm:ss') || '';
  }
}
