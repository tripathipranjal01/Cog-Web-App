import { FormGroup } from '@angular/forms';

export class GenericValidator {
  constructor(
    private validationMessages: { [key: string]: { [key: string]: string } }
  ) {}

  processMessages(container: FormGroup): { [key: string]: string } {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const messages: any = {};
    for (const controlKey in container.controls) {
      // eslint-disable-next-line no-prototype-builtins
      if (container.controls.hasOwnProperty(controlKey)) {
        const c = container.controls[controlKey];
        if (c instanceof FormGroup) {
          const childMessages = this.processMessages(c);
          Object.assign(messages, childMessages);
        } else {
          if (this.validationMessages[controlKey]) {
            messages[controlKey] = '';
            if ((c.dirty || c.touched) && c.errors) {
              Object.keys(c.errors).map(messageKey => {
                if (this.validationMessages[controlKey][messageKey]) {
                  messages[controlKey] +=
                    this.validationMessages[controlKey][messageKey] + ' ';
                }
              });
            }
          }
        }
      }
    }
    return messages;
  }
}
