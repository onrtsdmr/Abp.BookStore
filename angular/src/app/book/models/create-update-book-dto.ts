
export class CreateUpdateBookDto  {
  authorId: string;
  name: string;
  type: any;
  publishDate: string;
  price: number;

  constructor(initialValues: Partial<CreateUpdateBookDto> = {}) {
    if (initialValues) {
      for (const key in initialValues) {
        if (initialValues.hasOwnProperty(key)) {
          this[key] = initialValues[key];
        }
      }
    }
  }
}
