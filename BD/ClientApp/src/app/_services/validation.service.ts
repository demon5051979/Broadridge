import { Injectable, ElementRef } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class ValidationService {
    constructor() { }

    scrollToRequiredField(el: ElementRef) {
        setTimeout(x => {
            const invalidControl = el.nativeElement.querySelector('.alert-danger');
            console.log(invalidControl)
            if (invalidControl) {
                invalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 200);
    }
}
