export class Product {
    id: number;
    name: string;
    image: string;
    idcat: number;
    title: string;
    description: string;
   
    constructor(id: number, name: string, image: string, idcat: number,title: string,description: string) {
      this.id = id;
      this.name = name;
      this.image = image;
      this.idcat = idcat;
      this.title = title;
      this.description = description;
    }
  }