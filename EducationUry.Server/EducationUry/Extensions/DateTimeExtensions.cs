using System;

namespace EducationUry.Extensions
{
    public static class DateTimeExtensions
    {
        private static readonly long UnixEpochTicks = (new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).Ticks;

        public static long? ToUnixTime(this DateTime? value)
        {
            return (value?.ToUniversalTime().Ticks - UnixEpochTicks) / 10000;
        }

        public static long ToUnixTime(this DateTime value)
        {
            return (value.ToUniversalTime().Ticks - UnixEpochTicks) / 10000;
        }
    }
}