CREATE OR REPLACE FUNCTION public.updatepreferences(max_price numeric, min_size numeric, distr text, user_id_input numeric)
 RETURNS TABLE(flat_id bigint, preferred integer)
 LANGUAGE plpgsql
AS $function$
	begin
		update profilemeta 
			set price_max = max_price, size_min = min_size, district = distr 
			where profilemeta.id = user_id_input;
		update flatsmeta 
			set preferred = 0;
		update flatsmeta 
			set preferred = 1
			where flatsmeta.user_id = user_id_input
			and flatsmeta.id in (
				select dwc.id from dm_wng_clr dwc
				left join profilemeta p on 1=1
				where p.district  = dwc.adr   
				--where cast(replace(TRIM(coalesce(dwc.prc,'0')), ',', '.') as numeric) <= cast(p.price_max as numeric) 
				
				--and cast(replace(TRIM(coalesce(dwc.sz,'0')),',', '.') as numeric) >= cast(p.size_min as numeric)
				
			);
		return query 
			select flatsmeta.id as flat_id, flatsmeta.preferred 
			from flatsmeta;
	END;
$function$
;
