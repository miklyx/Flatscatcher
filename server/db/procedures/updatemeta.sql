CREATE OR REPLACE PROCEDURE public.updatemeta()
 LANGUAGE plpgsql
AS $procedure$
	begin
		insert into flatsmeta (id,shown) 
			select c.id,1 
			from clear c 
			left join flatsmeta fm on c.id=fm.id
			where fm.id is null;
		insert into flatsmetagg (dttm, total, lastcnt, applied)  
		select 
			current_timestamp,
			(select count(*) from flatsmeta),
			(select count(shown) from flatsmeta where shown is not null),
			(select count(applied) from flatsmeta where applied is not null);		
	END;
$procedure$
;
