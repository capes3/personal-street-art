insert into users (id)
    values($1)
    returning *;