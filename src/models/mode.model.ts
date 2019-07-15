import { Model } from 'objection';

export class Mode extends Model {
  id: number;
  name: string;

  static get tableName() {
    return 'modes';
  }
  static get idColumn() {
    return 'id';
  }
  static async upsertGraphFromList(list: Set<string>) {
    const dbModes: Mode[] = await Mode.query();
    const modes: Mode[] = [];

    // Collect all modes we already have, plus any we don't to get a complete list.
    // First, find the union.
    modes.push(...dbModes.filter(db => list.has(db.name))
    // Then add the difference,
    .concat([...list]
      // by finding any in the list not in the DB.
      .filter(tag => !dbModes.find(m => m.name === tag))
        // Finally, convert the string only list names into a Mode object
        .map((name: string) => {
          const mode = new Mode();
          mode.id = null;
          mode.name = name;
          return mode;
        })));

    return Mode.query().upsertGraph(modes);
  }
}
