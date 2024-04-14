
var dbm;
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.runSql(`
  CREATE TABLE IF NOT EXISTS public.product (
    id                SERIAL PRIMARY KEY,
    name              VARCHAR(50) NOT NULL,
    price             INTEGER NOT NULL,
    status            INTEGER DEFAULT 10,
    user_id           INTEGER NOT NULL,
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`, function (err) {
    if (err) return callback(err);
    callback();
  });
};

exports.down = function (db, callback) {
  db.runSql(`
          DROP TABLE IF EXISTS product;
          `, function (err) {
    if (err) return callback(err);
    callback();
  });
};

exports._meta = {
  "version": 1
};
