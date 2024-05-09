export default async (id) =>{
    const {data, error} = await useFetch(`http://127.0.0.1:8000/api/universities/${id}`);
    if(error.value){
        throw createError({
            statusCode: error.value.statusCode,
            statusMessage: error.value.statusMessage
        })
    }
    return { data } 
}