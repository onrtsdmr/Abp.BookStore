using Volo.Abp.Application.Dtos;

namespace Elementym.BookStore.Authors
{
    public class GetAuthorListDto: PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }
    }
}
