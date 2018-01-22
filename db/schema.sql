drop table if exists user

create table users(
    id serial primary key,
    user_name text,
    email text,
    img text,
    auth text
)