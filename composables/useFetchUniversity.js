export default async (id) =>{
    const {data, error} = await useFetch(`https://visal.newlinkmarketing.com/api/universities/${id}`);
    console.log('API Response:', data.value);
    if(error.value){
        throw createError({
            statusCode: error.value.statusCode,
            statusMessage: error.value.statusMessage
        })
    }
    return { data } 
}