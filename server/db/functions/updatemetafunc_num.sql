CREATE OR REPLACE FUNCTION public.updatemetafunc(user_id_input numeric)
 RETURNS TABLE(lastvisit timestamp without time zone, total bigint, lastcnt bigint, applied bigint, user_id integer)
 LANGUAGE plpgsql
AS $function$
	BEGIN
		insert into flatsmeta (id,shown, user_id) 
			select c.id,1 , user_id_input
			from clear c 
			left join flatsmeta fm on c.id=fm.id
			where fm.id is null;
		insert into flatsmetagg (dttm, total, lastcnt, applied, user_id)  
		select 
			current_timestamp,
			(select count(*) from flatsmeta),
			(select count(shown) from flatsmeta where shown is not null),
			(select count(flatsmeta.applied) from flatsmeta where flatsmeta.applied = 1),
			user_id_input;
		return query 
			select lag(flatsmetagg.dttm) over (order by flatsmetagg.dttm) as lastvisit, 
					flatsmetagg.total, 
					flatsmetagg.lastcnt, 
					flatsmetagg.applied,
					flatsmetagg.user_id
			from flatsmetagg where flatsmetagg.user_id = user_id_input
			ORDER BY flatsmetagg.dttm desc limit 1;
	END;
$function$
;
