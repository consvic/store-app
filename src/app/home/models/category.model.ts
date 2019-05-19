
export class Category {
  id: number;
  name: string;
  sublevels?: Category[];

  constructor(id: number, name: string, sublevels?: Category[]) {
    this.id = id;
    this.name = name;
    this.sublevels = sublevels;
  }
}
