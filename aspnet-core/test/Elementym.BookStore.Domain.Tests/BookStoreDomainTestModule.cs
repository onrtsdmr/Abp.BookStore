using Elementym.BookStore.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace Elementym.BookStore
{
    [DependsOn(
        typeof(BookStoreEntityFrameworkCoreTestModule)
        )]
    public class BookStoreDomainTestModule : AbpModule
    {

    }
}