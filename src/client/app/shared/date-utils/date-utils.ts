export class DateUtils {
  public static StartOfDayForDate(date: Date) {
    let dayStart = new Date(date);
    dayStart.setHours(0);
    dayStart.setMinutes(0);
    dayStart.setSeconds(0);
    dayStart.setMilliseconds(0);

    return dayStart;
  }

  public static DateStringForDate(date: Date): string {
    return date.getFullYear().toString() + '-' + this.PadToTwoDigits(date.getMonth() + 1) + '-' + this.PadToTwoDigits(date.getDate());
  }

  private static PadToTwoDigits(n: number) {
    if (n < 10) {
      return '0' + n.toString();
    } else {
      return n.toString();
    }
  }
}
