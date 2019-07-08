import { Model } from 'objection';

export class Tag extends Model {
  id: number;
  name: string;

  static get tableName() {
    return 'tags';
  }
  static get idColumn() {
    return 'id';
  }
  static async upsertGraphFromList(list: Set<string>) {
    const dbTags: Tag[] = await Tag.query();
    const tags: Tag[] = [];

    // Collect all tags we already have, plus any we don't to get a complete list.
    // First, find the union.
    tags.push(...dbTags.filter(db => list.has(db.name))
    // Then add the difference,
    .concat([...list]
      // by finding any in the list not in the DB.
      .filter(tag => !dbTags.find(t => t.name === tag))
        // Finally, convert the string only list names into a Tag object
        .map((name: string) => {
          const tag = new Tag();
          tag.id = null;
          tag.name = name;
          return tag;
        })));

    return Tag.query().upsertGraph(tags);
  }
}
