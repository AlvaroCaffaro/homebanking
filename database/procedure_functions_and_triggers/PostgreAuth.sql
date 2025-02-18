CREATE OR REPLACE PROCEDURE person.insert_holder(
				dni_p varchar(15),
				name_p varchar(60),
				secondname_p varchar(60),
				lastname_p varchar(60),
				email_h varchar(255),
				username_h varchar(60),
				password_h varchar(60)
			)
LANGUAGE plpgsql
AS $$
DECLARE
	person_id uuid;
	message text;
BEGIN
	
	begin 
		
		INSERT INTO person.person (dni,name,secondname,lastname) 
			values (dni_p,name_p,secondname_p,lastname_p);
	
		SELECT id INTO person_id FROM person.person WHERE dni = dni_p;

		IF person_id = null THEN
			raise exception 'the person dni is not registered';
		END IF; 
	
		INSERT INTO person.holder (person_id,state,username,password,email) 
				VALUES (
						person_id,
						'pending',
						username_h,
						password_h,
						email_h
						);
		commit;

	EXCEPTION 
		WHEN others then 
			rollback;
			message := 'Error: ' || SQLERRM;
            RAISE NOTICE '%', mensaje;
	end;
		
END
$$;




CREATE OR REPLACE FUNCTION person.match(
	usern VARCHAR(60)
)
RETURNS TABLE(
	id uuid, 
	username varchar(60),
	hashed_password varchar(60), 
	email varchar(255),
	person_id uuid, 
	dni varchar(15),
	name varchar(60),
	secondname varchar(60),
	lastname varchar(60)
)

LANGUAGE plpgsql
AS $$
BEGIN
	RETURN QUERY 
	SELECT h.id, h.username,(h.password) as hashed_password, h.email ,(p.id) AS person_id,p.dni,p.name,p.secondname,p.lastname 
	FROM person.holder h 
	INNER JOIN person.person p ON p.id = h.person_id
	WHERE (h.username = usern) AND (h.state = 'accepted');
END
$$;
