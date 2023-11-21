CREATE OR REPLACE FUNCTION public.updatemetafunc()
 RETURNS TABLE(lastvisit timestamp without time zone, total bigint, lastcnt bigint, applied bigint)
 LANGUAGE plpgsql
AS $function$
	BEGIN
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
			(select count(flatsmeta.applied) from flatsmeta where flatsmeta.applied is not null);
		return query 
			select lag(flatsmetagg.dttm) over (order by flatsmetagg.dttm) as lastvisit, 
					flatsmetagg.total, 
					flatsmetagg.lastcnt, 
					flatsmetagg.applied 
			from flatsmetagg 
			ORDER BY flatsmetagg.dttm desc limit 1;
	END;
$function$
;
