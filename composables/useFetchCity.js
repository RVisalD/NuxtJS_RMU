export default async (city) =>{
    const {data, error} = await useFetch(`http://127.0.0.1:8000/api/universities/city/${city}`);
    if(error.value){
        throw createError({
            ...error.value,
            statusMessage: 'Unable to fetch university by city' 
        })
    }
    return { data } 
}