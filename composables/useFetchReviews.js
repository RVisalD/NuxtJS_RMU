export default async (id) =>{
    const {data, error} = await useFetch(`http://127.0.0.1:8000/api/reviews/${id}`);
    if(error.value){
        throw createError({
            ...error.value,
            statusMessage: 'Unable to fetch reviews' 
        })
    }
    return { data } 
}