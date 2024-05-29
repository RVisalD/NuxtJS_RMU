export default async (city) =>{
    const {data, error} = await useFetch(`https://visal.newlinkmarketing.com/api/universities/city/${city}`);
    if(error.value){
        throw createError({
            ...error.value,
            statusMessage: 'Unable to fetch university by city' 
        })
    }
    return { data } 
}