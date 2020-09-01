import {ListService, PagedResultDto} from '@abp/ng.core';
import {Component, OnInit} from '@angular/core';
import {BookDto, BookType} from "./models";
import {BookService} from "./services";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbDateAdapter, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {Confirmation, ConfirmationService} from '@abp/ng.theme.shared';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [
    ListService,
    {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}
  ]
})
export class BookComponent implements OnInit {

  book = {items: [], totalCount: 0} as PagedResultDto<BookDto>;

  selectedBook = new BookDto();

  form: FormGroup;

  bookType = BookType;

  bookTypes = Object.keys(this.bookType).filter(
    (key) => typeof this.bookType[key] === 'number'
  );

  isModalOpen = false;

  constructor(
    public readonly list: ListService,
    private bookService: BookService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    const bookStreamCreator = (query) => this.bookService.getListByInput(query);

    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.book = response;
      console.log(response);
    })
  }

  createBook() {
    this.buildForm();
    this.isModalOpen = true;
  }

  editBook(id: string) {
    this.bookService.getById(id).subscribe((book) => {
      this.selectedBook = book;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe((status) => {
        if (status === Confirmation.Status.confirm) {
          this.bookService.deleteById(id).subscribe(() => this.list.get());
        }
      }
    );
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.selectedBook.name || '', Validators.required],
      type: [this.selectedBook.type || null, Validators.required],
      publishDate: [this.selectedBook.publishDate ? new Date(this.selectedBook.publishDate) : null, Validators.required],
      price: [this.selectedBook.price || null, Validators.required],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedBook.id
      ? this.bookService.updateByIdAndInput(this.form.value, this.selectedBook.id)
      : this.bookService.createByInput(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      // this.form.reset();
      this.list.get();
    });
  }

}
