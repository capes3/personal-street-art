insert into users (user_name, email, img, auth)
    values($1,$2,$3,$4)
    returning *;