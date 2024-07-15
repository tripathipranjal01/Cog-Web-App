import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationService } from '../../services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-site-shifts-configuration',
  templateUrl: './site-shifts-configuration.component.html',
  styleUrls: ['./site-shifts-configuration.component.scss'],
})
export class SiteShiftsConfigurationComponent implements OnInit {
  @Output() backTab = new EventEmitter<void>();
  @Output() saveTab = new EventEmitter<void>();

  checked: any;
  selectedShift = 1;
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
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.siteId = params.get('id') || null;
      console.log('Site ID:', this.siteId); // Log siteId for debugging
      if (this.siteId) {
        this.loadShifts(this.siteId);
      }
    });
  }

  loadShifts(siteId: string): void {
    this.configService.getAllShifts(siteId).subscribe(
      (shifts: any[]) => {
        if (shifts.length > 0) {
          this.shifts = shifts.map(shift => ({
            id: shift.id,
            startTime: shift.startTime || '08:00',
            endTime: shift.endTime || '17:00',
            sequence: shift.sequence,
            siteId: shift.siteId,
          }));
          this.selectedShift = shifts.length;
        } else {
          this.initializeDefaultShift();
        }
      },
      error => {
        console.error('Failed to fetch shifts:', error);
        this.initializeDefaultShift();
      }
    );
  }

  initializeDefaultShift(): void {
    this.shifts = [
      {
        startTime: '08:00',
        endTime: '17:00',
        sequence: 1,
        siteId: this.siteId,
      },
    ];
    this.selectedShift = 1;
  }

  updateShifts(): void {
    const requiredShifts = this.selectedShift;
    if (this.shifts.length > requiredShifts) {
      this.shifts.length = requiredShifts;
    } else if (this.shifts.length < requiredShifts) {
      for (let i = this.shifts.length; i < requiredShifts; i++) {
        this.shifts.push({
          startTime: '08:00',
          endTime: '17:00',
          sequence: i + 1,
          siteId: this.siteId,
        });
      }
    }
  }

  deleteShift(shiftId: string, index: number): void {
    if (shiftId) {
      this.configService.deleteShift(shiftId).subscribe(
        () => {
          this.shifts.splice(index, 1);
          this.selectedShift--;
          this.updateShifts();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Shift successfully deleted',
          });
        },
        error => console.error('Failed to delete shift:', error)
      );
    } else {
      this.shifts.splice(index, 1);
      this.selectedShift--;
      this.updateShifts();
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

    console.log('Formatted Shifts:', formattedShifts); // Log formatted shifts for debugging

    formattedShifts.forEach(shift => {
      if (shift.id) {
        console.log('Updating Shift:', shift); // Log shift before update
        this.configService.updateShift(shift.id, shift).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Shift successfully updated',
            });
            this.saveTab.emit();
          },
          error =>
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error updating shift',
            })
        );
      } else {
        this.configService.createShift(shift).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Shift successfully created',
            });
            this.saveTab.emit();
          },
          error =>
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error creating shift',
            })
        );
      }
    });
  }

  private formatTime(date: string): string {
    if (!date) return '00:00:00';
    const parsedDate = new Date(`1970-01-01T${date}Z`);
    return isNaN(parsedDate.getTime())
      ? '00:00:00'
      : parsedDate.toISOString().substr(11, 8);
  }
}
