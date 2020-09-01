using System;
using System.Threading.Tasks;
using Elementym.BookStore.Authors;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Elementym.BookStore.Books
{
    public interface IBookAppService:
        ICrudAppService< //Defines CRUD methods
            BookDto, //Used to show books
            Guid, //Primary key of the book entity
            PagedAndSortedResultRequestDto, //Used for paging/sorting
            CreateUpdateBookDto>
    {
        Task<ListResultDto<AuthorLookupDto>> GetAuthorLookupAsync();
    }
}
