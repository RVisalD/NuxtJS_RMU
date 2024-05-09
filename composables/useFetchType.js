export default async (type) =>{
    const {data, error} = await useFetch(`http://127.0.0.1:8000/api/universities/type/${type}`);
    if(error.value){
        throw createError({
            ...error.value,
            statusMessage: 'Unable to fetch university by type' 
        })
    }
    return { data } 
}