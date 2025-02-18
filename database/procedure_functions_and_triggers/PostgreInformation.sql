
create or replace function banking.select_personalAccounts(holderid uuid)
returns table (    
	id bigint,
    number uuid,
    alias varchar(60),
    currency_id bigint,
    currency_code varchar(8),
    currency_name varchar(30),
    balance bigint,
    state varchar(60)
   )
LANGUAGE plpgsql
as $$
begin
	return query
		SELECT a.id,a.number,a.alias,c.id,c.code,c.name,a.balance,a.state
			FROM banking.account a
			inner join person.holder h on a.owner_id = h.id
			inner join banking.currency c on a.currency_id = c.id

			WHERE a.owner_id = holderid;
end
$$;

select * from banking.select_personalAccounts('31f0b80b-a71f-41ad-8aac-cd015038cbb5')



create or replace function person.get_personalInfo(holderid uuid)
returns table(
	id uuid,
	dni varchar(15),
	name varchar(60),
	secondname varchar(60),
	lastname varchar(60)
)
language plpgsql
as $$
begin
	return query
	SELECT 
		p.id,
		p.dni,
		p.name,
		p.secondname,
		p.lastname 
		
		FROM person.holder h 
		inner join person.person p on h.person_id = p.id 
		where h.id = holderid;
end
$$;



select* from person.holder h ;