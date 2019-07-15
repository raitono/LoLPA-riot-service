import { Model } from 'objection';

export class Image extends Model {
  id: string;
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;

  static get tableName() {
    return 'images';
  }
  static get idColumn() {
    return 'id';
  }
  static async fromAPI(apiImage: Object) {
    const dbImage = (await Image.query().findOne('full', apiImage.full));
    const image = new Image();
    image.id = dbImage ? dbImage.id : null;
    image.full = apiImage.full;
    image.sprite = apiImage.sprite;
    image.group = apiImage.group;
    image.x = apiImage.x;
    image.y = apiImage.y;
    image.w = apiImage.w;
    image.h = apiImage.h;
    return image;
  }
}
