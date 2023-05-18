using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using StackExchange.Redis;

namespace EducationUry.Extensions
{
    public class RedisCommandQueue
    {
        private readonly ITransaction _tran;
        private readonly IList<Task> _tasks = new List<Task>();

        public RedisCommandQueue Enqueue(Func<ITransaction, Task> cmd)
        {
            _tasks.Add(cmd(_tran));
            return this;
        }

        internal RedisCommandQueue(ITransaction tran) => _tran = tran;
        internal Task CompleteAsync() => Task.WhenAll(_tasks);
    }
}