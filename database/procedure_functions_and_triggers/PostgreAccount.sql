
create or replace function banking.compareUUID(
					identifier varchar(200),
					n uuid
				)
returns BOOLEAN 
LANGUAGE plpgsql
as $$
DECLARE
	cast_identifier uuid;
begin
	
	begin
		cast_identifier := (identifier::UUID);
	EXCEPTION
		WHEN others then
			return false;
	end;
		
	return (cast_identifier = n);
end;
$$;


create or replace function banking.find_account(identifier varchar(200))
returns table (    
	id bigint,
    number uuid,
    holder_id uuid,
    holder_dni varchar(15),
    holder_name varchar(60),
    holder_secondname varchar(60),
    holder_lastname varchar(60),
    alias varchar(60),
    currency_id bigint,
    currency_code varchar(8),
    currency_name varchar(30)
   )
LANGUAGE plpgsql
as $$
begin
	return query
		SELECT a.id,a.number,h.id,p.dni,p.name,p.secondname,p.lastname,a.alias,c.id,c.code,c.name
			FROM banking.account a
			inner join person.holder h on a.owner_id = h.id
			inner join person.person p on h.person_id = p.id
			inner join banking.currency c on a.currency_id = c.id

			WHERE ((a.alias = identifier or banking.compareUUID(identifier,a.number)) and a.state = 'accepted');
end
$$;






create or replace function banking.verify_balance(account_id bigint, amount numeric(10,2))
returns boolean
language plpgsql
as $$
DECLARE
	var_balance bigint;
BEGIN
	SELECT (a.balance) into var_balance from banking.account a where a.id = account_id;
	return(var_balance >= amount);
END;
$$;



CREATE OR REPLACE PROCEDURE banking.insert_transfer(
	destination_a bigint, 
	destination_currency_id bigint,
	destination_amount numeric(10,2), 
	remitter_a bigint,
	remmitter_currency_id bigint,
	remitter_amount numeric(10,2)
)
LANGUAGE plpgsql
AS $$
DECLARE
balance_var decimal(10,2);
BEGIN

	begin
		INSERT INTO banking.transfer (id,destination_account,remitter_account) 
						VALUES (
							nextval('banking.sequence_operation'),
							destination_a,
							remitter_a
						);
	
		INSERT INTO banking.transfer_price (id,transfer_id,currency_id,account_id,amount) 
						VALUES (
								nextval('banking.sequence_transfer_price'),
								currval('banking.sequence_operation'),
								destination_currency_id,
								destination_a,
								destination_amount
						);

		
		SELECT a.balance into balance_var from banking.account a WHERE id = remitter_a;

		if (balance_var < remitter_amount) then
			raise exception 'No posee la cantidad de dinero necesaria para realizar la transferencia.'
				using errcode = '22003'; -- código de error de valor numerico fuera de rango
		end if;
	
	
		INSERT INTO banking.transfer_price (id,transfer_id,currency_id,account_id,amount) 
					VALUES (
							nextval('banking.sequence_transfer_price'),
							currval('banking.sequence_operation'),
							remmitter_currency_id,
							remitter_a,
							(-1)*remitter_amount
						);


		commit;
	
	EXCEPTION 
		WHEN others then 
			rollback;
			RAISE EXCEPTION 'ERROR: %',SQLERRM;
	END;
END
$$;


CREATE OR REPLACE FUNCTION banking.update_balance_function()
RETURNS TRIGGER 
LANGUAGE plpgsql
AS $$
BEGIN

	update banking.account set balance = balance + new.amount where (new.account_id = id);    
	return new;
END;
$$;


CREATE TRIGGER update_balance_trigger
AFTER INSERT ON banking.transfer_price                
FOR EACH ROW EXECUTE FUNCTION banking.update_balance_function();



CREATE OR REPLACE FUNCTION banking.select_transfers(
    account_id_var BIGINT,
    initial_date DATE,
    final_date DATE
)

RETURNS TABLE (
    id BIGINT,
    code UUID,
    date_t TIMESTAMP WITH TIME ZONE,
    other_person_fullname text,
    other_person_dni varchar(15), 
    other_account_number uuid,
    currency_id BIGINT,
    currency_code VARCHAR(8),
    currency_name VARCHAR(30),
    amount NUMERIC(10, 2),
    type_t text
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.id,
        t.code,
        t."date" AS date_t,
		concat(p.lastname,', ',p.name,' ',coalesce(p.secondname,'')) as other_holder_fullname,
		p.dni,
		a.number,
        c.id AS currency_id,
        c.code AS currency_code,
        c."name" AS currency_name,
        tp.amount,
        (CASE 
            WHEN tp.account_id = t.destination_account THEN 'recibida'
            ELSE 'enviada'
        END) AS type_t
    FROM banking.transfer_price tp
    
	INNER JOIN banking.transfer t ON ( (tp.account_id = t.destination_account OR tp.account_id = t.remitter_account) and (tp.transfer_id = t.id) )
    INNER JOIN banking.currency c ON c.id = tp.currency_id
	INNER JOIN banking.account a ON ((tp.account_id = t.destination_account OR tp.account_id = t.remitter_account) and (tp.transfer_id = t.id) and tp.account_id = a.id)
	INNER JOIN person.holder h ON (a.owner_id = h.id)
	INNER JOIN person.person p on (h.person_id = p.id)
    WHERE (tp.account_id = account_id_var) AND (t."date" BETWEEN initial_date AND final_date)
	order by t.date desc;
END
$$;



CREATE OR REPLACE FUNCTION banking.select_lastTransfers(
    account_id_var BIGINT
)

RETURNS TABLE (
    id BIGINT,
    code UUID,
    date_t TIMESTAMP WITH TIME ZONE,
    other_person_fullname text,
    other_person_dni varchar(15), 
    other_account_number uuid,
    currency_id BIGINT,
    currency_code VARCHAR(8),
    currency_name VARCHAR(30),
    amount NUMERIC(10, 2),
    type_t text
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.id,
        t.code,
        t."date" AS date_t,
		concat(p.lastname,', ',p.name,' ',coalesce(p.lastname,'')) as other_holder_fullname,
		p.dni,
		a.number,
        c.id AS currency_id,
        c.code AS currency_code,
        c."name" AS currency_name,
        tp.amount,
        (CASE 
            WHEN tp.account_id = t.destination_account THEN 'recibida'
            ELSE 'enviada'
        END) AS type_t
    FROM banking.transfer_price tp
    
	INNER JOIN banking.transfer t ON ( (tp.account_id = t.destination_account OR tp.account_id = t.remitter_account) and (tp.transfer_id = t.id) )
    INNER JOIN banking.currency c ON c.id = tp.currency_id
	INNER JOIN banking.account a ON ((tp.account_id = t.destination_account OR tp.account_id = t.remitter_account) and (tp.transfer_id = t.id) and tp.account_id = a.id)
	INNER JOIN person.holder h ON (a.owner_id = h.id)
	INNER JOIN person.person p on (h.person_id = p.id)
    WHERE tp.account_id = account_id_var
	order by t.date
	limit 10;
END
$$;



create or replace function banking.select_personAccounts (person_id_var uuid)
returns table (    
	id bigint,
    number uuid,
    holder_id uuid,
    holder_dni varchar(15),
    holder_name varchar(60),
    holder_secondname varchar(60),
    holder_lastname varchar(60),
    alias varchar(60),
    currency_id bigint,
    currency_code varchar(8),
    currency_name varchar(30)
)
LANGUAGE plpgsql
AS $$
begin

    RETURN QUERY
	SELECT 
			a.id,
			a.number,
			p.id,
			p.dni,
			p.name,
			p.secondname,
			p.lastname,
			a.alias,
			c.id,
			c.code,
			c.name
	FROM person.person p
	INNER JOIN person.holder h on p.id = h.person_id
	INNER JOIN banking.account a on h.id = a.owner_id
	INNER JOIN banking.currency c on a.currency_id = c.id
	
	WHERE p.id = person_id_var;
			
end
$$;

select * from banking.select_personAccounts('0f0a197b-1c89-4095-82f4-1c223f536129');
select * from banking.select_personAccounts('728c738f-7f50-454f-810a-b876ab6dc5cc');

select * from person.person



create or replace function person.lastest_persons (account_id bigint)
RETURNS TABLE (
    id uuid,
    dni varchar(15),
    name varchar(60),
    secondname varchar(60),
    lastname varchar(60)
)
LANGUAGE plpgsql
AS $$
begin

RETURN QUERY
SELECT 
	p.id,
	p.dni,
	p.name,
	p.secondname,
	p.lastname 

FROM banking.transfer t
INNER JOIN banking.account a on t.destination_account = a.id
INNER JOIN person.holder h on a.owner_id = h.id
INNER JOIN person.person p on h.person_id = p.id

WHERE t.remitter_account = account_id
GROUP BY p.id,p.dni,p.name,p.secondname,p.lastname
ORDER BY t.date  DESC
limit 10;

end
$$;




