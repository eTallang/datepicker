import { Component, OnInit } from '@angular/core';
import { getDaysInMonth, addMonths, subMonths, subDays, addDays, isSameDay } from 'date-fns';

interface Day {
  date: Date;
  monthOffset: 'previous' | 'current' | 'next';
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  headers: string[] = [ 'M', 'T', 'W', 'T', 'F', 'S', 'S' ];
  daysOfCurrentMonth: Day[] = [];
  selectedDate = new Date();

  get currentMonth(): Date {
    if (this.daysOfCurrentMonth.length) {
      return this.daysOfCurrentMonth[7].date;
    }
  }

  ngOnInit(): void {
    this.daysOfCurrentMonth = this.getDaysOfMonth(this.selectedDate);
  }

  selectDate(date: Day): void {
    if (date.monthOffset === 'previous') {
      this.shiftMonth(-1);
    } else if (date.monthOffset === 'next') {
      this.shiftMonth(1);
    } else {
      this.selectedDate = date.date;
    }
  }

  shiftMonth(offset: number): void {
    const newMonth = addMonths(this.currentMonth, offset);
    this.daysOfCurrentMonth = this.getDaysOfMonth(newMonth);
  }

  isSelectedDay(d: Date): boolean {
    return isSameDay(d, this.selectedDate);
  }

  private getDaysOfMonth(d: Date): Day[] {
    const days: Day[] = [];

    for (let i = 1; i <= getDaysInMonth(d); i++) {
      days.push({
        date: new Date(d.getFullYear(), d.getMonth(), i),
        monthOffset: 'current'
      });
    }

    const firstDayOfMonth = days[0].date;
    for (let i = 1; i <= firstDayOfMonth.getUTCDay(); i++) {
      days.unshift({
        date: subDays(firstDayOfMonth, i),
        monthOffset: 'previous'
      });
    }

    const lastDayOfMonth = days[days.length - 1].date;
    const daysNextMonth = 7 - days.length % 7;
    for (let i = 1; i <= daysNextMonth; i++) {
      days.push({
        date: addDays(lastDayOfMonth, i),
        monthOffset: 'next'
      });
    }

    return days;
  }
}
