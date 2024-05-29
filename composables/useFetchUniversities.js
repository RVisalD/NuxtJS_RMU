export default async  (filters) => {
    const {data, error, refresh} = await  useFetch(`https://visal.newlinkmarketing.com/api/universities/filter`, {
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