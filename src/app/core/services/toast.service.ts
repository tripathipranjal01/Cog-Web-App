import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastService {
  messageService = inject(MessageService);

  showToastMessage(heading: string, message: string, severity: string) {
    this.messageService.add({
      key: 'bc-toast',
      severity: severity,
      summary: heading,
      detail: message,
    });
  }
}
