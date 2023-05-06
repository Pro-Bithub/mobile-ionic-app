export class Product {
    id: number;
    name: string;
    image: string;
    idcat: number;
  
    constructor(id: number, name: string, image: string, idcat: number) {
      this.id = id;
      this.name = name;
      this.image = image;
      this.idcat = idcat;
    }
  }