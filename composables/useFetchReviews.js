export default async (id) =>{
    const {data, error} = await useFetch(`https://visal.newlinkmarketing.com/api/reviews/${id}`);
    if(error.value){
        throw createError({
            ...error.value,
            statusMessage: 'Unable to fetch reviews' 
        })
    }
    return { data } 
}