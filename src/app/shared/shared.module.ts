import { NgModule } from '@angular/core';
import { DateFormatPipe } from './pipes/date-format.pipe';

@NgModule({
    imports: [],
    declarations: [DateFormatPipe],
    exports: [DateFormatPipe]
})
export class SharedModule { }