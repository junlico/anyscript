import Axios from 'axios';

async function fetcher(file: string) {
  try {
    const response = await Axios.get(`/json/${file}.json`);
    return response.data;
  } catch {
    console.error(`Failed to load file: ${file}`);
    return {};
  }
}

export type V = string | number;
// export type Obj<T> = Record<string, T>;
export type Entity<T> = { [key: string]: T };

export abstract class VRepository<T> {
  private file: string;
  // protected entities: Obj<T> = {};
  protected entities: Entity<T> = {};

  constructor(file: string) {
    this.file = file;
  }

  async loadEntities(): Promise<void> {
    console.log(`Loading ${this.file} ...`);
    const raw: Obj<Obj<V>> = await fetcher(this.file);

    for (const key in raw) {
      if (Object.prototype.hasOwnProperty.call(raw, key)) {
        const item = raw[key];
        if (this.isValid(item)) {
          this.loadEntity(item);
        }
      }
    }

    console.log(`   load ${Object.keys(this.entities).length} entities`);
  }

  clearEntities(): void {
    this.entities = {};
  }

  getEntity(id: V): T {
    return this.entities[id];
  }

  protected isValid(item: Obj<V>): boolean {
    return !!item._Name;
  }

  protected abstract loadEntity(item: Obj<V>): void;
}
