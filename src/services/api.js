const getCharachters = async ({term, offset, limit}) => {
    const key = `53dbc5b69e72f607d5e0f4ba897eae93`;

    const request = {
        api: `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${term}&limit=${limit}&offset=${offset}&apikey=${key}`,
        options: {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }
    }


    const response = await fetch(`${request.api}`, request.options)
    const data = await response.json();
    return data
}

export {getCharachters}