using System;
using System.Threading.Tasks;
using StackExchange.Redis;

namespace EducationUry.Extensions
{
    public static class RedisExtensions
    {
        public static async Task<bool> TransactAsync(this IDatabase db, Action<RedisCommandQueue> addCommands)
        {
            var tran = db.CreateTransaction();
            var q = new RedisCommandQueue(tran);

            addCommands(q);

            if (await tran.ExecuteAsync())
            {
                await q.CompleteAsync();
                return true;
            }

            return false;
        }
    }
}