import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { ToastService } from "./toast.service";

@Injectable({ providedIn: 'root' })
export class ApiErrorService {
    toastService = inject(ToastService);

    public handleError = (error: HttpErrorResponse) => {
      if (error.error instanceof ErrorEvent) {
        console.error(`Client error: ${error.error.message}`);
      } else {
        console.error(`Server error (${error.status}): ${error.error.message}`);
      }
      this.toastService.showToastMessage(
        error.error?.reason,
        error.error?.message,
        'error'
      );
  
      return throwError(() => error);
    };
}
