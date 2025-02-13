type TimeUnit = 'seconds' | 'minutes' | 'hours' | 'days';

interface Expiration {
  minutes?: number;
  hours?: number;
  days?: number;
}

export class DateHelper {
  public static dateDifference(date1: Date, date2: Date) {
    const diffInMillis = Math.abs(date1.getTime() - date2.getTime());

    const seconds = Math.floor((diffInMillis / 1000) % 60);
    const minutes = Math.floor((diffInMillis / (1000 * 60)) % 60);
    const hours = Math.floor((diffInMillis / (1000 * 60 * 60)) % 24);
    const days = Math.floor((diffInMillis / (1000 * 60 * 60 * 24)) % 30);
    const months = Math.floor((diffInMillis / (1000 * 60 * 60 * 24 * 30)) % 12);
    const years = Math.floor(diffInMillis / (1000 * 60 * 60 * 24 * 365));

    return { years, months, days, hours, minutes, seconds };
  }

  public static calculateRemainingTime(targetDate: Date, unit: TimeUnit = 'seconds') {
    const remainingTime = targetDate.getTime() - new Date().getTime();

    if (remainingTime <= 0) return 0;

    const conversions: Record<TimeUnit, number> = {
      seconds: 1000,
      minutes: 1000 * 60,
      hours: 1000 * 60 * 60,
      days: 1000 * 60 * 60 * 24,
    };

    return Math.floor(remainingTime / conversions[unit]);
  }

  public static calculateExpiration({ minutes, hours, days }: Expiration) {
    const expiresAt = new Date();

    if (minutes) expiresAt.setMinutes(expiresAt.getMinutes() + minutes);
    if (hours) expiresAt.setHours(expiresAt.getHours() + hours);
    if (days) expiresAt.setDate(expiresAt.getDate() + days);

    return expiresAt;
  }
}
