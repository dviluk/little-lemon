import * as Sql from "expo-sqlite";

export const database = Sql.openDatabase("little_lemon ", "1");

function query<T>(q: string, args: any[] = []): Promise<T> {
  return new Promise((resolve, reject) => {
    database.exec([{ sql: q, args }], true, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      if (result.length === 1) {
        const data = result[0] as Sql.ResultSet;
        resolve(data.rows as T);
      }
    });
  });
}

const menu = {
  async init() {
    database.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price NUMERIC, category TEXT, image TEXT  );"
      );
    });
  },
  async all(params: { categories?: string[]; search?: string } = {}) {
    let sql = "SELECT * FROM menu";

    const constrains: string[] = [];
    const args: any[] = [];

    if (params.categories && params.categories.length > 0) {
      constrains.push(
        `category in (${params.categories.map((item) => "?").join(",")})`
      );
      args.push(...params.categories);
    }

    if (params.search) {
      constrains.push("name like ?");
      args.push(`%${params.search}%`);
    }

    if (constrains.length) {
      sql += " where " + constrains.join(" and ");
    }

    const items = await query<MenuItem[]>(sql, args);
    return items;
  },
  async insert(items: MenuItem[]) {
    database.transaction((tx) => {
      items.forEach((item) => {
        tx.executeSql(
          "INSERT INTO menu (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)",
          [item.name, item.description, item.price, item.image, item.category]
        );
      });
    });
  },
};

export const Repositories = {
  menu,
};
