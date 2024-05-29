export default async (type) =>{
    const {data, error} = await useFetch(`https://visal.newlinkmarketing.com/api/universities/type/${type}`);
    if(error.value){
        throw createError({
            ...error.value,
            statusMessage: 'Unable to fetch university by type' 
        })
    }
    return { data } 
}