import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeDate'
})
export class ChangeDatePipe implements PipeTransform {

  transform(value: any,hour:any): any {

    var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    var current_date = new Date(value);
    let date_return = current_date.getUTCDate() + " de " + months[current_date.getUTCMonth()] + " del " + current_date.getUTCFullYear()

    if (hour) {
        var options = {
            // timeZone: 'UTC',
            hour12: true
        };
        var hours = current_date.toLocaleString('en-ES', options);

        date_return += " " + hours
    }

    return date_return;

    return null;
  }

}
