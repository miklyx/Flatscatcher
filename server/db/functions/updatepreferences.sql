CREATE OR REPLACE FUNCTION public.updatepreferences(max_price numeric, min_size numeric, distr text, min_rooms numeric, user_id_input numeric)
 RETURNS TABLE(flat_id bigint, preferred integer)
 LANGUAGE plpgsql
AS $function$
	begin
		update profilemeta 
			set price_max = max_price, size_min = min_size, district = distr, rooms_min = min_rooms 
			where profilemeta.id = user_id_input;
		update flatsmeta 
			set preferred = 1
			where flatsmeta.user_id = user_id_input
			and flatsmeta.id in (
				select dwc.id from dm_wng_clr dwc
				left join profilemeta p on 1=1
				where cast(dwc.prc as numeric) <= p.price_max 
				and dwc.adr = 'KREUZBERG'
				and cast(dwc.sz as numeric) >= p.size_min 
				and cast(nullif(dwc.rom,'') as numeric) >= p.rooms_min
			);
		return query 
			select flatsmeta.id as flat_id, flatsmeta.preferred 
			from flatsmeta;
	END;
$function$
;
