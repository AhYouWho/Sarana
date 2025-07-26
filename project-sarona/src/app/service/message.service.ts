import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private toast: ToastrService) {}

  doMessage(status: string, message: string, title: string) {
    if (status === 'Succeed') {
      this.toast.success(message, title);
    } else if (status === 'Warning') {
      this.toast.warning(message, title);
    } else {
      this.toast.error(message, title);
    }
  }
}
