export class WebStorageManager {
	private static photoFilterParametersKey = 'last-photo-filters';
	private static lookMapKey = 'look-map';
	
	public static savePhotoFilterParameters = (name: string | null, locationId: string | null, author: string | null, source: string | null, yearMin: number | null, yearMax: number | null) => {
		localStorage.setItem(WebStorageManager.photoFilterParametersKey, JSON.stringify(({
			name: name,
			locationId: locationId,
			author: author,
			source: source,
			yearMin: yearMin,
			yearMax: yearMax
		})))
	};
	
	public static loadPhotoFilterParameters = () => {
		const value = localStorage.getItem(WebStorageManager.photoFilterParametersKey);
		const json = value === null ? null : JSON.parse(value);
		
		return ({
			name: (json?.name || null) as (string | null),
			locationId: (json?.locationId || null) as (string | null),
			author: (json?.author || null) as (string | null),
			source: (json?.source || null) as (string | null),
			yearMin: (json?.yearMin || null) as (number | null),
			yearMax: (json?.yearMax || null) as (number | null)
		})
	};
	
	public static saveLookMap = (lat: number, lon: number, zoom: number) => {
		localStorage.setItem(WebStorageManager.lookMapKey, JSON.stringify(({
			lat: lat,
			lon: lon,
			zoom: zoom
		})))
	};
	
	public static loadLookMap = () => {
		const value = localStorage.getItem(WebStorageManager.lookMapKey);
		const json = value === null ? null : JSON.parse(value);
		
		return ({
			lat: (json?.lat || null) as (number | null),
			lon: (json?.lon || null) as (number | null),
			zoom: (json?.zoom || null) as (number | null)
		})
	};
}