
var dbm;
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.runSql(`

  CREATE TABLE IF NOT EXISTS public.user (
    id                SERIAL PRIMARY KEY,
    first_name        VARCHAR(50) NOT NULL,
    last_name         VARCHAR(50) NOT NULL,
    middle_name       VARCHAR(50) DEFAULT NULL,
    phone             VARCHAR(50) NOT NULL,
    email             VARCHAR(80) DEFAULT NULL,
    password          VARCHAR(50) DEFAULT NULL,
    status            INTEGER DEFAULT 10,
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_phone UNIQUE (phone)
);
`, function (err) {
    if (err) return callback(err);
    callback();
  });
};

exports.down = function (db, callback) {
  db.runSql(`
  
          DROP TABLE IF EXISTS public.user;
          `, function (err) {
    if (err) return callback(err);
    callback();
  });
};

exports._meta = {
  "version": 1
};