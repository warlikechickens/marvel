import { getCharachters } from "./api";

const search = async (term = '', page = 0, size = 20) => {
    const paramters = {
        offset: size * page,
        term: term,
        limit: size
    };
    const responseData = await getCharachters(paramters);
    const bookmarks = load();

    const data = {
        pageInfo: {
            total: responseData.data.total,
            size: responseData.data.limit,
            page: (responseData.data.offset / responseData.data.limit)
        },
        charachters: responseData.data.results.map(el => {
            return {
                id: el.id,
                name: el.name,
                thumbnail: `${el.thumbnail.path}.${el.thumbnail.extension}`,
                bookmark: bookmarks.some(k => k.id === el.id)
            }
        })
    }
    
    return data;
}

const save = (charachter) => {
    const newBookmark = { ...charachter, bookmark: !charachter.bookmark }
    const bookmarkedCharachters = load();

    return localStorage.setItem('charachters', JSON.stringify([...bookmarkedCharachters, newBookmark]))
}

const load = () => {
    return JSON.parse(localStorage.getItem('charachters') || '[]')
}

export { search, save, load }