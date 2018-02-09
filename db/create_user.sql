insert into users (id, user_number )
    values($1, $2)
    returning *;