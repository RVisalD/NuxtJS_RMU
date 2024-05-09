export default async  (filters) => {
    const {data, error, refresh} = await  useFetch(`http://127.0.0.1:8000/api/universities/filter`, {
        params: {
            ...filters
        }
    });
    if(error.value){
        throw createError({
            ...error.value,
            statusMessage: 'Unable to fetch universities' 
        })
    }
    return {data, refresh}
}