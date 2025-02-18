create schema person


CREATE TABLE person.person ( 
  id uuid not null default gen_random_uuid(),
  dni varchar(15) not null,
  name varchar(60) not null,
  secondName varchar(60) null,
  lastName varchar(60) not null,
  
  constraint pk_person primary key(id),
  constraint uk_dni unique(dni)
  
);




CREATE TABLE person.holder(
  id uuid not null default gen_random_uuid(),
  person_id uuid not null,
  username varchar(60) not null,
  password varchar(60) not null,
  email varchar(255) not null,
  state varchar(12) not null,
  check(state in ('pending','rejected','accepted')), 
  constraint pk_holder primary key(id),
  constraint fk_holder_person foreign key(person_id) references person.person(id),
  constraint uk_holder_username unique(username)
  
);



create schema banking;
create table banking.currency ( 
  id bigint not null,
  code varchar(8) not null,
  name varchar(30) not null,
  constraint pk_currency primary key(id),
  constraint uk_code unique(code)
);



create sequence banking.sequence_currency
start with 1
minvalue 1
increment by 1
owned by banking.currency.id;

alter table banking.currency
alter column id set default nextval('banking.sequence_currency');



create table banking.account( 
  id bigint not null,
  number uuid not null default gen_random_uuid(),
  owner_id uuid not null,
  alias varchar(60) not null,
  currency_id bigint not null,
  balance bigint not null default 0,
  state varchar(60) not null default 'pending',
  check(state in ('pending','rejected','accepted')), 
  constraint pk_account primary key(id),
  constraint uk_number unique(number),
  constraint fk_account_holder foreign key(owner_id) references person.holder(id),
  constraint uk_alias unique(alias),
  constraint fk_account_currency foreign key(currency_id) references banking.currency(id)
);



create sequence banking.sequence_account
start with 1
minvalue 1
increment by 1
owned by banking.account.id;


alter table banking.account
alter column id set default nextval('banking.sequence_account'); 




create table banking.transfer(
    id bigint NOT null,
    code uuid NOT null default gen_random_uuid(),
    destination_account BIGINT NOT NULL,
    remitter_account BIGINT NOT NULL,
    date TIMESTAMP WITH TIME ZONE not null default now(),
    CONSTRAINT pk_transfer PRIMARY KEY (id),
    CONSTRAINT uk_transfer_code UNIQUE (code),
    CONSTRAINT fk_transfer_destinationAccount FOREIGN KEY (destination_account) REFERENCES banking.account(id),
    CONSTRAINT fk_transfer_remitterAccount FOREIGN KEY (remitter_account) REFERENCES banking.account(id)
    
);


create sequence banking.sequence_operation
	start with 1
	minvalue 1
	increment by 1
	owned by banking.transfer.id;
	


alter table banking.transfer
alter column id set default nextval('banking.sequence_operation');





create table banking.transfer_price(
	id bigint not null,
	transfer_id bigint not null,
	currency_id bigint not null,
	account_id bigint not null,
	amount numeric(10,2) not null,
	CONSTRAINT fk_price_transfer foreign key (transfer_id) references banking.transfer(id),
    CONSTRAINT fk_price_currency FOREIGN KEY (currency_id) REFERENCES banking.currency(id),
    CONSTRAINT fk_price_account FOREIGN KEY (account_id) REFERENCES banking.account(id),
   	constraint uk_price unique(transfer_id,currency_id,account_id)
	
);


create sequence banking.sequence_transfer_price
	start with 1
	minvalue 1
	increment by 1
	owned by banking.transfer_price.id;


alter table banking.transfer_price
alter column id set default nextval('banking.sequence_transfer_price');


CREATE TABLE person.employee(
  id uuid not null default gen_random_uuid(),
  person_id uuid not null,
  constraint pk_employee primary key(id),
  constraint fk_employee_person foreign key(person_id) references person.person(id) 
)


create schema audit;

create sequence audit.sequence_audit
	start with 1
	minvalue 1
	increment by 1;




create table audit.staff_audit_holder(
	id bigint not null default nextval('audit.sequence_audit'),
	employee_id uuid not null,
	holder_id uuid not null,
	old_value varchar(60) not null,
	new_value varchar(60) not null,
	date TIMESTAMP WITH TIME ZONE not null default now(),
	constraint pk_staffAuditHolder primary key(id),
	constraint fk_staffAuditHolder_employee foreign key(employee_id) references person.employee(id),
	constraint fk_staffAuditHolder_holder foreign key(holder_id) references person.holder(id)
);



create table audit.staff_audit_account(
	id bigint not null default nextval('audit.sequence_audit'),
	employee_id uuid not null,
	account_id bigint not null,
	old_value varchar(60) not null,
	new_value varchar(60) not null,
	date TIMESTAMP WITH TIME ZONE not null default now(),
	constraint pk_staffAuditAccount primary key(id),
	constraint fk_staffAuditAccount_employee foreign key(employee_id) references person.employee(id),
	constraint fk_staffAuditAccount_account foreign key(account_id) references banking.account(id)
);

