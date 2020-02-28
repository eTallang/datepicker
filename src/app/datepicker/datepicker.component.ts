import { Component, OnInit, Input } from '@angular/core';
import { getDaysInMonth, addMonths, subDays, addDays, isSameDay, differenceInCalendarMonths } from 'date-fns';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  headers: string[] = [ 'M', 'T', 'W', 'T', 'F', 'S', 'S' ];
  daysOfCurrentMonth: Date[] = [];
  @Input() selectedDate = new Date();

  get currentMonth(): Date {
    if (this.daysOfCurrentMonth.length) {
      return this.daysOfCurrentMonth[7];
    }
  }

  ngOnInit(): void {
    this.daysOfCurrentMonth = this.getDaysOfMonth(this.selectedDate);
  }

  selectDate(date: Date): void {
    const diffInMonths = differenceInCalendarMonths(date, this.currentMonth);
    if (diffInMonths !== 0) {
      this.shiftMonth(diffInMonths);
    } else {
      this.selectedDate = date;
    }
  }

  shiftMonth(offset: number): void {
    const newMonth = addMonths(this.currentMonth, offset);
    this.daysOfCurrentMonth = this.getDaysOfMonth(newMonth);
  }

  isSelectedDay(d: Date): boolean {
    return isSameDay(d, this.selectedDate);
  }

  isSelectedMonth(d: Date): boolean {
    return differenceInCalendarMonths(d, this.currentMonth) === 0;
  }

  private getDaysOfMonth(d: Date): Date[] {
    const days: Date[] = [];

    for (let i = 1; i <= getDaysInMonth(d); i++) {
      days.push(new Date(d.getFullYear(), d.getMonth(), i));
    }

    const firstDayOfMonth = days[0];
    for (let i = 1; i <= firstDayOfMonth.getUTCDay(); i++) {
      days.unshift(subDays(firstDayOfMonth, i));
    }

    const lastDayOfMonth = days[days.length - 1];
    const daysNextMonth = 7 - days.length % 7;
    for (let i = 1; i <= daysNextMonth; i++) {
      days.push(addDays(lastDayOfMonth, i));
    }

    return days;
  }
}
